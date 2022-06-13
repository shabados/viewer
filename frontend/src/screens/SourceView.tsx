/* eslint-disable jsx-a11y/click-events-have-key-events */

import { mapValues } from 'lodash'
import { SkipBack, SkipForward } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { createUseStyles } from 'react-jss'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

import Button from '../components/Button'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Nav from '../components/Nav'
import Slider from '../components/Slider'
import { PAGE_API } from '../lib/consts'
import { savePosition } from '../lib/utils'
import { SourcePageResponse, SourcesResponse } from '../types/api'

const useStyles = createUseStyles( {
  aTag: {
    textDecoration: 'none',
    color: 'inherit',
  },

  sourceView: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f0ede9',
    minHeight: '100vh',
    userSelect: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lines: {
    padding: '1em',
    textAlign: 'justify',
    marginBottom: '3.245em',
  },

  line: {
    fontFamily: 'Open Gurbani Akhar',
    fontWeight: '700',
    fontSize: '1.325em',
    lineHeight: '1.756em',
    transition: '0.125s all ease-in-out',
    padding: '0.18em 0.238em',
    borderRadius: '0.136em',
    '&:hover': {
      cursor: 'pointer',
      outline: 'none',
      background: '#dccda2',
      borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
    },
    '&:focus': {
      outline: 'none',
    },
  },

  focused: {
    background: '#f5cd3d',
    borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
  },

  controls: {
    backgroundImage: 'linear-gradient(#e1dfddcc, #e1dfddff)',
    display: 'flex',
    gap: '1rem',
    position: 'fixed',
    bottom: '0',
    paddingBottom: '0.163em',
    borderTop: '1px solid #d4d1cd',
    width: '100%',
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
  previousPage: [ 'ctrl+left', 'pageup' ],
  nextPage: [ 'ctrl+right', 'pagedown' ],
  firstPage: [ 'ctrl+home' ],
  lastPage: [ 'ctrl+end' ],
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

  const navigatingTimeout = useRef<number>()

  const [ navigating, setNavigating ] = useState( false )

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
    // Display current page number
    setNavigating( true )
    clearTimeout( navigatingTimeout.current )
    navigatingTimeout.current = setTimeout( () => setNavigating( false ), 600 ) as unknown as number

    if ( nextPage && nextPage !== rawPage ) navigate( `/sources/${source}/page/${nextPage}/line/0`, { replace: true } )
  }

  const nextPage = () => {
    if ( rawPage < length! ) goToPage( rawPage + 1 )
  }

  const previousPage = () => {
    if ( rawPage > 1 ) goToPage( rawPage - 1 )
  }

  const firstPage = () => goToPage( 1 )
  const lastPage = () => goToPage( length! )

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
    firstPage,
    lastPage,
    openLine: onLineEnter,
  }

  const classes = useStyles()

  return (
    <>
      <Nav />
      <div className={classes.sourceView}>
        {err && <Error err={err} />}
        {!( lines || err ) && <Loader />}

        <GlobalHotKeys keyMap={KEY_MAP} handlers={handlers} allowChanges>
          <CSSTransition
            in={!loading}
            timeout={200}
            classNames="fade"
          >
            <section className={classes.lines}>
              {lines?.map( ( { id, gurmukhi }, index: number ) => (
                <Link key={id} to={`/sources/${source}/page/${page}/line/${index}/view`} className={classes.aTag}>
                  <span
                    ref={( ref ) => { lineRefs.current[ index ] = ref! }}
                    className={`cy-line ${classes.line} ${rawLine === index ? classes.focused : ''}`}
                    tabIndex={0}
                    role="button"
                  >
                    {gurmukhi}
                  </span>
                </Link>
              ) )}
            </section>
          </CSSTransition>

          <section className={classes.controls}>
            <Link to={page > 1 ? `/sources/${source}/page/${page - 1}/line/0` : '#'}>
              <Button disabled={page <= 1}>
                <SkipBack />
              </Button>
            </Link>

            <Slider
              min={1}
              max={length ?? 1}
              value={rawPage}
              label={pageNameGurmukhi ?? ''}
              onChange={( [ page ] ) => goToPage( page )}
              tooltipActive={navigating}
              disabled={length === 1}
            />

            <Link to={page < length! ? `/sources/${source}/page/${page + 1}/line/0` : ''}>
              <Button disabled={page >= length!}>
                <SkipForward />
              </Button>
            </Link>
          </section>
        </GlobalHotKeys>
      </div>
    </>
  )
}

export default SourceView
