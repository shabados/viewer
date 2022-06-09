import './LineView.css'

import { Popover } from '@harjot1singh/react-tiny-popover'
import { countSyllables, stripVishraams, toSyllabicSymbols, toUnicode } from 'gurmukhi-utils'
import { mapValues } from 'lodash'
import { ReactNode, useDeferredValue, useEffect, useState } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'

import Error from '../components/Error'
import IconButton from '../components/IconButton'
import LinkButton from '../components/LinkButton'
import Loader from '../components/Loader'
import Menu from '../components/Menu'
import MenuItem from '../components/MenuItem'
import TranslationBlock from '../components/TranslationBlock'
import { PAGE_API } from '../lib/consts'
import { getDictionaryLink, getIssueUrl, GetIssueUrlOptions } from '../lib/utils'
import { SourcePageLineResponse, SourcePageResponse, SourcesResponse } from '../types/api'

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

  return (
    <div className="line-view">

      {err && <Error err={err} />}

      <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
        <div className="header">
          <div className="left buttons">
            <LinkButton className="button" icon="level-up-alt" to={sourceViewUrl} data-cy="go-to-home-button" />
            <LinkButton className="button" icon="caret-left" disabled={!previousLineUrl} replace to={previousLineUrl} />
          </div>

          <h1>
            {gurmukhi
              ? gurmukhi
                .split( ' ' )
                .map( ( word: string, index: number ) => (
                // eslint-disable-next-line react/no-array-index-key
                  <div key={index}>
                    <a
                      className="gurmukhi"
                      href={getDictionaryLink( stripVishraams( toUnicode( word ) ) )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {word}
                    </a>
                    <span>{toSyllabicSymbols( word )}</span>
                  </div>
                ) as ReactNode )
                .reduce( ( prev, curr ) => [ prev, ' ', curr ] )
              : <Loader size="1em" />}

            {gurmukhi && <span className="syllable-count">{countSyllables( gurmukhi )}</span>}
          </h1>

          <div className="right buttons">
            <LinkButton className="button" icon="caret-right" replace to={nextLineUrl} data-cy="go-to-next-line-button" />

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
              <IconButton icon="ellipsis-v" onClick={toggleMenu} data-cy="menu-button-dots" />
            </Popover>
          </div>
        </div>

        <div className="content">
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
