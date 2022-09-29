/* eslint-disable jsx-a11y/click-events-have-key-events */

import { stripVishraams } from 'gurmukhi-utils'
import { useAtomValue } from 'jotai'
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
import { zoom } from './Interface'

const useStyles = createUseStyles( {
  sourceContent: {
    // placeholder so it can be used in nested sourceControls definition
  },
  sourceControls: {
    position: 'fixed',
    bottom: 0,
    zIndex: 0,
    borderTop: '1px solid rgba(0,0,0,0.1)',
    background: '#E3E0DC',
    width: '100%',
    '& + $sourceContent': {
      paddingBottom: `calc(${theme.Gutter})`,
    },
  },

  line: {
    marginLeft: '0.2em',
    transition: theme.Normally,
    '&:first-child': {
      marginLeft: 0,
    },
    '&:hover': {
      color: theme.Blue,
    },
  },

  focused: {
    color: theme.Teal,
  },

  controlsContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },

  '@media (prefers-color-scheme: dark)': {
    line: {
      '&:hover': {
        color: theme.BlueDarkScheme,
      },
    },
    focused: {
      color: theme.TealDarkScheme,
    },
  },

  '@media (pointer: coarse)': {
    sourceControls: {
      paddingBottom: `calc(${theme.Gutter} / 2)`,
      '& + $sourceContent': {
        paddingBottom: `calc(${theme.Gutter} * 1.5)`,
      },
    },
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

  const zoomValue = useAtomValue( zoom )

  return (
    <Layout>
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
      <div className={classes.sourceContent}>
        <Content>
          <Section>
            {err && <Error err={err} />}
            {!( lines || err ) && <Loader />}

            <GlobalHotKeys keyMap={KEY_MAP} handlers={handlers} allowChanges>
              {lines?.map( ( { id, gurmukhi }, index: number ) => (
                <Link
                  key={id}
                  to={`/sources/${source}/page/${page}/line/${index}/view`}
                  ref={( ref ) => { lineRefs.current[ index ] = ref! }}
                  className={`${classes.line} ${rawLine === index ? classes.focused : ''}`}
                  style={{ fontSize: `${zoomValue}rem` }}
                  data-cy="go-to-home-value"
                >
                  <AsciiGurmukhi>{stripVishraams( gurmukhi )}</AsciiGurmukhi>
                </Link>
              ) )}
            </GlobalHotKeys>
          </Section>
        </Content>
      </div>
    </Layout>
  )
}

export default SourceView
