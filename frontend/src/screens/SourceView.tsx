/* eslint-disable jsx-a11y/click-events-have-key-events */

import { stripVishraams } from 'gurmukhi-utils'
import { mapValues } from 'lodash'
import { SkipBack, SkipForward } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { createUseStyles } from 'react-jss'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

import AsciiGurmukhi from '../components/AsciiGurmukhi'
import Button from '../components/Button'
import Content from '../components/Content'
import Error from '../components/Error'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Section from '../components/Section'
import theme from '../helpers/theme'
import { PAGE_API } from '../lib/consts'
import { savePosition } from '../lib/utils'
import { SourcePageResponse, SourcesResponse } from '../types/api'

const useStyles = createUseStyles( {
  sourceView: {
    height: `calc(100vh - ${theme.Gutter})`,
    display: 'flex',
    flexDirection: 'column',
  },

  sourceContent: {
    flexGrow: 1,
    overflow: 'scroll',
    overscrollBehavior: 'contain',
  },

  sourceControls: {
    flexGrow: 0,
    borderTop: '1px solid rgba(0,0,0,0.1)',
    background: 'rgba(0, 0, 0, 0.05)',
    width: '100%',
  },

  line: {
    marginLeft: `calc(${theme.BlankSpace} * 2)`,
    transition: theme.Normally,
    color: 'rgb(16.87% 14.48% 8.69%)',
    '&:hover': {
      color: theme.Blue,
    },
  },

  focused: {
    color: 'rgb(0% 52.14% 55.32%)',
  },

  controlsContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
} )

type SourceViewParams = 'page' | 'source' | 'line'

const KEY_MAP = {
  previousLine: [ 'shift+tab', 'left' ],
  nextLine: [ 'tab', 'right' ],
  firstLine: [ 'home' ],
  lastLine: [ 'end' ],
  // belowLine: [ 'down' ],
  // aboveLine: [ 'up' ],
  openLine: [ 'enter' ],
  previousPage: [ 'shift+left', 'pageup' ],
  nextPage: [ 'shift+right', 'pagedown' ],
}

const BLOCKED_KEYS = [ 'Tab', 'PageUp', 'PageDown' ]
const blockKeys = ( event: KeyboardEvent ) => {
  if ( BLOCKED_KEYS.some( ( key ) => event.key === key ) ) event.preventDefault()
}

type SourceViewProps = {
  sources: SourcesResponse,
}

const SourceView = ( { sources }: SourceViewProps ) => {
  const {
    line: rawLine = 0,
    page: rawPage = 1,
    source,
  } = mapValues( useParams<SourceViewParams>(), Number )

  const [ page ] = useDebounce( rawPage, 100 )
  const [ line ] = useDebounce( rawLine, 100 )

  const lineRefs = useRef<{ [key: number]: HTMLElement }>( {} )

  const {
    data: lines,
    error: err,
  } = useSWR<SourcePageResponse, Error>( `${PAGE_API}/${source}/page/${rawPage}` )

  const loading = !lines

  useEffect( () => {
    if ( !loading ) return

    lineRefs.current = {}
  }, [ loading ] )

  useEffect( () => {
    document.addEventListener( 'keydown', blockKeys )

    return () => document.removeEventListener( 'keydown', blockKeys )
  }, [] )

  useEffect( () => {
    savePosition( source, page, line )
  }, [ source, page, line ] )

  useEffect( () => {
    if ( !lines ) return

    lineRefs.current[ line ]?.scrollIntoView( { block: 'center' } )
  }, [ line, lines ] )

  const navigate = useNavigate()
  const location = useLocation()

  const { length, pageNameGurmukhi } = sources.find( ( { id } ) => id === source ) ?? {}

  const focusLine = ( line: number ) => {
    navigate( `/sources/${source}/page/${page}/line/${line}`, { replace: true } )

    lineRefs.current[ line ].scrollIntoView( { block: 'center' } )
  }

  const goToPage = ( nextPage: number ) => {
    if ( nextPage && nextPage !== rawPage ) navigate( `/sources/${source}/page/${nextPage}/line/0`, { replace: true } )
  }

  const nextPage = () => {
    if ( rawPage < length! ) goToPage( rawPage + 1 )
  }

  const previousPage = () => {
    if ( rawPage > 1 ) goToPage( rawPage - 1 )
  }

  const nextLine = () => {
    if ( rawLine < lines!.length - 1 ) focusLine( rawLine + 1 )
    else nextPage()
  }

  const previousLine = () => {
    if ( rawLine > 0 ) focusLine( rawLine - 1 )
    else previousPage()
  }

  const firstLine = () => focusLine( 0 )
  const lastLine = () => focusLine( lines!.length - 1 )

  const onLineEnter = () => navigate( `${location.pathname}/view` )

  const belowLine = () => {
    const lineRef = lineRefs.current[ rawLine ]
    const { offsetTop, offsetLeft } = lineRef
    const { scrollY } = window

    // Scroll element into view
    lineRef.scrollIntoView( { block: 'center' } )

    // Calculate element's relative y position to viewport
    const styles = getComputedStyle( lineRef )
    const [ lineHeight ] = styles.lineHeight.split( 'px' )
    const relativeY = offsetTop - scrollY

    // Get below the line element and index
    const element = document.elementFromPoint( offsetLeft + 4, +lineHeight + relativeY )

    const [ index ] = Object
      .entries( lineRefs.current )
      .find( ( [ , line ] ) => line === element )
    || [ line ]

    focusLine( +index )
  }

  const aboveLine = () => {
    const lineRef = lineRefs.current[ line ]
    const { offsetTop, offsetLeft } = lineRef
    const { scrollY } = window

    // Scroll element into view
    lineRef.scrollIntoView( { block: 'center' } )

    // Calculate element's relative y position to viewport
    const relativeY = offsetTop - scrollY

    // Get above the line element and index
    const element = document.elementFromPoint( offsetLeft + 4, relativeY - 4 )

    const [ index ] = Object
      .entries( lineRefs.current )
      .find( ( [ , line ] ) => line === element )
    ?? [ line ]

    focusLine( +index )
  }

  const handlers = {
    previousLine,
    nextLine,
    firstLine,
    lastLine,
    belowLine,
    aboveLine,
    previousPage,
    nextPage,
    openLine: onLineEnter,
  }

  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.sourceView}>
        <div className={classes.sourceContent}>
          <Content>
            <Section>
              {err && <Error err={err} />}
              {!( lines || err ) && <Loader />}

              <GlobalHotKeys keyMap={KEY_MAP} handlers={handlers} allowChanges>
                {lines?.map( ( { id, gurmukhi }, index: number ) => (
                  <Link key={id} to={`/sources/${source}/page/${page}/line/${index}/view`}>
                    <span
                      ref={( ref ) => { lineRefs.current[ index ] = ref! }}
                      className={`cy-line ${classes.line} ${rawLine === index ? classes.focused : ''}`}
                      tabIndex={0}
                      role="button"
                    >
                      <AsciiGurmukhi>{stripVishraams( gurmukhi )}</AsciiGurmukhi>
                    </span>
                  </Link>
                ) )}
              </GlobalHotKeys>
            </Section>
          </Content>
        </div>
        {length! > 1 && (
        <div className={classes.sourceControls}>
          <Content>
            <div className={classes.controlsContent}>
              <Link to={page > 1 ? `/sources/${source}/page/${page - 1}/line/0` : '#'}>
                <Button disabled={page <= 1}>
                  <SkipBack />
                </Button>
              </Link>

              <AsciiGurmukhi>
                {pageNameGurmukhi ? `${pageNameGurmukhi} ` : ''}
                {rawPage}
                {' '}
                /
                {' '}
                {length}
              </AsciiGurmukhi>

              <Link to={page < length! ? `/sources/${source}/page/${page + 1}/line/0` : ''}>
                <Button disabled={page >= length!}>
                  <SkipForward />
                </Button>
              </Link>
            </div>
          </Content>
        </div>
        )}
      </div>

    </Layout>
  )
}

export default SourceView
