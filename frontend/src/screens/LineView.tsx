import { Popover } from '@harjot1singh/react-tiny-popover'
import { countSyllables, stripVishraams, toSyllabicSymbols, toUnicode } from 'gurmukhi-utils'
import { mapValues } from 'lodash'
import { Menu as More, SkipBack, SkipForward, X } from 'lucide-react'
import { ReactNode, useDeferredValue, useEffect, useState } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { createUseStyles } from 'react-jss'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'

import Button from '../components/Button'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Menu from '../components/Menu'
import MenuItem from '../components/MenuItem'
import TranslationBlock from '../components/TranslationBlock'
import { PAGE_API } from '../lib/consts'
import { getDictionaryLink, getIssueUrl, GetIssueUrlOptions } from '../lib/utils'
import { SourcePageLineResponse, SourcePageResponse, SourcesResponse } from '../types/api'

const useStyles = createUseStyles( {
  lineView: {
    height: '100%',
    minHeight: '100vh',
    background: 'white',
  },

  header: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    background: '#f0ede9',
    marginBottom: '2em',
    position: 'sticky',
    top: '0',
    zIndex: '1',
  },

  header1: {
    fontWeight: 'normal',
    transition: '0.125s all ease-in-out',
    textAlign: 'center',
    fontSize: '1.325em',
    lineHeight: '1.756em',
    color: '#2d2026',
    margin: '0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  headerDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '0.35em',
    marginTop: '0.3em',
    marginBottom: '0.3em',
  },

  headerLink: {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.125s ease-in-out',
    borderRadius: '0.136em',
    borderBottom: '2px solid rgba(0, 136, 191, 0.4)',
    '&:hover': {
      cursor: 'pointer',
      outline: 'none',
      background: '#a2ced8',
      borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
    },
  },

  headerSpan: {
    fontSize: '0.5em',
    color: '#888',
    lineHeight: '1.6em',
  },

  headerDivSpan: {
    letterSpacing: '0.55em',
    paddingLeft: '0.55em',
  },

  syllableCount: {
    top: '1.43em',
    marginBottom: '3em',
    position: 'relative',
    background: '#d0cbce',
    borderRadius: '0.5em',
    padding: '0.2em',
    height: '1.4em',
    lineHeight: '1.4em',
    minWidth: '1.4em',
    color: '#2d2026',
  },

  buttons: {
    display: 'flex',
  },

  content: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 2em',
    height: '100%',
    position: 'relative',
  },

  popoverMenu: {
    zIndex: '10',
  },

} )

const OVERFLOW_LINE = 10000000

const keyMap = {
  goPreviousLine: [ 'left', 'shift+tab' ],
  goNextLine: [ 'right', 'tab' ],
  goUp: [ 'home', 'esc', 'backspace' ],
}

type GetPreviousLineUrlOptions = {
  sourceNumber: number,
  page: number,
  lineNumber: number,
}

const getPreviousLineUrl = ( { sourceNumber, page, lineNumber }: GetPreviousLineUrlOptions ) => {
  if ( !( page - 1 ) && !lineNumber ) return null

  return lineNumber
    ? `/sources/${sourceNumber}/page/${page}/line/${lineNumber - 1}/view`
    : `/sources/${sourceNumber}/page/${page - 1}/line/${OVERFLOW_LINE}/view`
}

type GetNextLineUrlOptions = {
  sourceNumber: number,
  page: number,
  lineNumber: number,
  source?: { length: number },
  lines?: any[],
}

const getNextLineUrl = ( {
  sourceNumber,
  source,
  lines,
  page,
  lineNumber,
}: GetNextLineUrlOptions ) => {
  if ( !source || page - 1 >= source.length - 1 || !lines ) return null

  return lineNumber < lines.length - 1
    ? `/sources/${sourceNumber}/page/${page}/line/${lineNumber + 1}/view`
    : `/sources/${sourceNumber}/page/${page + 1}/line/0/view`
}

type LineViewProps = {
  sources: SourcesResponse,
}

type LineViewParams = 'page' | 'source' | 'line'

const LineView = ( { sources }: LineViewProps ) => {
  const {
    page,
    source: sourceNumber,
    line: lineNumber,
  } = mapValues( useParams<LineViewParams>(), Number )

  const source = sources.find( ( { id } ) => sourceNumber === id )

  // 3 dot menu
  const [ menuOpen, setMenuOpen ] = useState( false )
  const toggleMenu = () => setMenuOpen( !menuOpen )

  const closeMenuAfter = ( fn: () => void ) => () => {
    fn()
    setMenuOpen( false )
  }

  // Line data
  const debouncedLineNumber = useDeferredValue( lineNumber )

  const {
    data: line,
    error: lineError,
  } = useSWR<SourcePageLineResponse, Error>( `${PAGE_API}/${sourceNumber}/page/${page}/line/${debouncedLineNumber}` )

  // Pre-fetch next page + previous page
  useSWR( `${PAGE_API}/${sourceNumber}/page/${page}/line/${debouncedLineNumber - 1}` )
  useSWR( `${PAGE_API}/${sourceNumber}/page/${page}/line/${debouncedLineNumber + 1}` )

  // Page data
  const { data: lines, error: linesError } = useSWR<SourcePageResponse, Error>( `${PAGE_API}/${sourceNumber}/page/${page}` )

  const { translations, gurmukhi } = line ?? {}

  const submitCorrection = () => window.open( getIssueUrl( { ...source, ...line } as GetIssueUrlOptions ), 'blank' )

  const { pathname } = useLocation()

  // Navigation urls
  const sourceViewUrl = pathname.split( '/' ).slice( 0, -1 ).join( '/' )
  const previousLineUrl = getPreviousLineUrl( { sourceNumber, page, lineNumber } )
  const nextLineUrl = getNextLineUrl( { sourceNumber, page, lineNumber, lines, source } )

  const navigate = useNavigate()

  // Hotkey handlers
  const goPreviousLine = () => previousLineUrl && navigate( previousLineUrl, { replace: true } )
  const goNextLine = () => nextLineUrl && navigate( nextLineUrl, { replace: true } )
  const goUp = () => navigate( sourceViewUrl, { replace: true } )

  const handlers = { goPreviousLine, goNextLine, goUp }

  const isPreviousPageOverflow = lineNumber >= ( lines || [] ).length

  useEffect( () => {
    if ( !isPreviousPageOverflow || !lines || !line ) return

    navigate( `/sources/${sourceNumber}/page/${page}/line/${lines.length - 1}/view`, { replace: true } )
  }, [ isPreviousPageOverflow, navigate, line, lines, sourceNumber, page ] )

  const err = linesError || lineError

  const classes = useStyles()

  return (
    <div className={classes.lineView}>

      {err && <Error err={err} />}

      <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
        <div className={classes.header}>
          <div className={classes.buttons}>
            <Link to={sourceViewUrl} data-cy="go-to-home-button">
              <Button>
                <X />
              </Button>
            </Link>
            <Link replace to={previousLineUrl || ''}>
              <Button disabled={!previousLineUrl}>
                <SkipBack />
              </Button>
            </Link>
          </div>

          <h1 className={classes.header1}>
            {gurmukhi
              ? gurmukhi
                .split( ' ' )
                .map( ( word: string, index: number ) => (
                // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className={classes.headerDiv}>
                    <a
                      className={`gurmukhi ${classes.headerLink}`}
                      href={getDictionaryLink( stripVishraams( toUnicode( word ) ) )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {word}
                    </a>
                    <span className={`${classes.headerDivSpan} ${classes.headerSpan}`}>{toSyllabicSymbols( word )}</span>
                  </div>
                ) as ReactNode )
                .reduce( ( prev, curr ) => [ prev, ' ', curr ] )
              : <Loader size="1em" />}

            {gurmukhi && <span className={`${classes.syllableCount} ${classes.headerSpan}`}>{countSyllables( gurmukhi )}</span>}
          </h1>

          <div className={classes.buttons}>
            <Link replace to={nextLineUrl || ''} data-cy="go-to-next-line-button">
              <Button disabled={!nextLineUrl}>
                <SkipForward />
              </Button>
            </Link>

            <Popover
              isOpen={menuOpen}
              onClickOutside={() => setMenuOpen( false )}
              containerClassName="popover-menu"
              positions={[ 'left' ]}
              content={(
                <Menu>
                  <MenuItem onClick={closeMenuAfter( submitCorrection )}>
                    Report an issue
                  </MenuItem>
                </Menu>
                )}
            >
              <div onClick={toggleMenu} data-cy="menu-button-dots">
                <Button>
                  <More />
                </Button>
              </div>
            </Popover>
          </div>
        </div>

        <div className={classes.content}>
          {translations
            ?.map( ( translation ) => (
              <TranslationBlock key={translation.translationSourceId} {...translation} />
            ) )
            .filter( ( x ) => x )
            .reverse()}
        </div>
      </GlobalHotKeys>
    </div>
  )
}

export default LineView
