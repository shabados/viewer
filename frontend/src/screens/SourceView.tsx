/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useAtomValue } from 'jotai'
import { mapValues } from 'lodash'
import { SkipBack, SkipForward } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { createUseStyles } from 'react-jss'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

import AsciiGurmukhi, { Form } from '../components/AsciiGurmukhi'
import Button from '../components/Button'
import Content from '../components/Content'
import Error from '../components/Error'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Section from '../components/Section'
import theme from '../helpers/theme'
import { PAGE_API } from '../lib/consts'
import { PanktiSelector, PositionCallback } from '../lib/speech/PanktiSelector'
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
    background: theme.Shader,
    width: '100%',
    '& + $sourceContent': {
      paddingBottom: `calc(${theme.Gutter})`,
    },
  },

  line: {
    padding: [ theme.Gap, theme.BlankSpace ],
    borderRadius: theme.Gap,
    outline: [ '2px', 'solid', 'transparent' ],
    transition: theme.Normally,
    '&:first-child': {
      marginLeft: 0,
    },
    '&:hover': {
      backgroundColor: theme.Shader,
    },
  },

  active: {
    color: theme.Blue,
    '& > span > span': {
      filter: 'brightness(1.25) saturate(1.25)',
    },
  },

  focused: {
    outlineColor: theme.Blue,
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
        backgroundColor: theme.Highlighter,
      },
    },
    active: {
      color: theme.BlueDarkScheme,
      '& > span > span': {
        filter: 'brightness(1.25) saturate(1.5)',
      },
    },
    focused: {
      outlineColor: theme.BlueDarkScheme,
    },
    sourceControls: {
      background: theme.Highlighter,
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
  activatePreviousLine: [ 'left' ],
  activateNextLine: [ 'right' ],
  focusPreviousLine: [ 'shift+tab' ],
  focusNextLine: [ 'tab' ],
  firstLine: [ 'home' ],
  lastLine: [ 'end' ],
  openLine: [ 'enter' ],
  previousPage: [ 'shift+left', 'pageup' ],
  nextPage: [ 'shift+right', 'pagedown' ],
  togglePanktiSelector: [ 'space' ],
  cookiePrompt: [ 'shift+space' ],
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

  const panktiSelectorRef = useRef<PanktiSelector | null>( null )

  const loading = !lines

  useEffect( () => {
    if ( !loading ) return

    lineRefs.current = {}
  }, [ loading ] )

  useEffect( () => {
    document.addEventListener( 'keydown', blockKeys )

    panktiSelectorRef.current = new PanktiSelector()

    return () => {
      document.removeEventListener( 'keydown', blockKeys )
      panktiSelectorRef.current = null
    }
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

  const activatePageLine: PositionCallback = ( page: number, line: number ) => {
    navigate( `/sources/${source}/page/${page}/line/${line}`, { replace: true } )

    lineRefs.current[ line ].scrollIntoView( { block: 'center' } )
  }

  const activateLine: PositionCallback = ( line: number ) => {
    navigate( `/sources/${source}/page/${page}/line/${line}`, { replace: true } )

    lineRefs.current[ line ].scrollIntoView( { block: 'center' } )
  }

  const focusLine = ( line: number ) => {
    lineRefs.current[ line ].focus()
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

  const activateNextLine = () => {
    if ( rawLine < lines!.length - 1 ) activateLine( rawLine + 1 )
    else nextPage()
  }

  const activatePreviousLine = () => {
    if ( rawLine > 0 ) activateLine( rawLine - 1 )
    else previousPage()
  }

  const focusNextLine = () => {
    if ( rawLine < lines!.length - 1 ) focusLine( rawLine + 1 )
    else nextPage()
  }

  const focusPreviousLine = () => {
    if ( rawLine > 0 ) focusLine( rawLine - 1 )
    else previousPage()
  }

  const firstLine = () => focusLine( 0 )
  const lastLine = () => focusLine( lines!.length - 1 )

  const onLineEnter = () => navigate( `${location.pathname}/view` )

  const togglePanktiSelector = () => {
    panktiSelectorRef.current?.ToggleRunningState()
  }

  const cookiePrompt = () => {
    const promptResponse = prompt( 'Enter Comma seperated key value to set as cookie:', 'TRANSCRIBER_NAME,WebSpeechApi' )
    if ( promptResponse && promptResponse.includes( ',' ) ) {
      const arr = promptResponse.split( ',' )
      PanktiSelector.setCookie( arr[ 0 ], arr[ 1 ] )
    } else {
      console.log( 'Invalid prompt value:', promptResponse )
    }
  }

  useEffect( () => {
    if ( !lines ) return

    console.log( 'original lines object:', lines )

    panktiSelectorRef.current?.SetCallback( activatePageLine )
    panktiSelectorRef.current?.SetLines( page, lines.map( ( line ) => line.gurmukhi ) )
  }, [ panktiSelectorRef.current, lines, page ] )

  const handlers = {
    activatePreviousLine,
    activateNextLine,
    focusPreviousLine,
    focusNextLine,
    firstLine,
    lastLine,
    previousPage,
    nextPage,
    togglePanktiSelector,
    cookiePrompt,
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

              <span>
                {pageNameGurmukhi ? <AsciiGurmukhi text={`${pageNameGurmukhi} `} /> : ''}
                <AsciiGurmukhi text={rawPage.toString()} />
                {' '}
                /
                {' '}
                <AsciiGurmukhi text={length.toString()} />
              </span>

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
                  className={`${classes.line} ${rawLine === index ? classes.active : ''}`}
                  style={{ fontSize: `${zoomValue}rem` }}
                  data-cy="go-to-home-value"
                >
                  <AsciiGurmukhi form={Form.syntactical} text={gurmukhi} />
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
