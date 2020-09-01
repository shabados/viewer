import React, { useEffect, useState } from 'react'
import { string, oneOfType, number, shape } from 'prop-types'
import { withRouter, useLocation, useHistory } from 'react-router-dom'
import Popover from 'react-tiny-popover'
import { stripVishraams, toUnicode } from 'gurmukhi-utils'
import { GlobalHotKeys } from 'react-hotkeys'
import { useDebounce } from 'use-debounce'
import useSWR from 'swr'

import { PAGE_API } from '../lib/consts'
import { getDictionaryLink, getIssueUrl } from '../lib/utils'

import Error from './Error'
import Loader from './Loader'
import LinkButton from './LinkButton'
import IconButton from './IconButton'
import TranslationBlock from './TranslationBlock'
import Menu from './Menu'
import MenuItem from './MenuItem'

import './LineView.css'

const OVERFLOW_LINE = 10000000

const keyMap = {
  goPreviousLine: [ 'left', 'shift+tab' ],
  goNextLine: [ 'right', 'tab' ],
  goUp: [ 'home', 'esc', 'backspace' ],
}

const getPreviousLineUrl = ( { sourceNumber, page, lineNumber } ) => {
  if ( !( page - 1 ) && !lineNumber ) return null

  return lineNumber
    ? `/sources/${sourceNumber}/page/${page}/line/${lineNumber - 1}/view`
    : `/sources/${sourceNumber}/page/${page - 1}/line/${OVERFLOW_LINE}/view`
}

const getNextLineUrl = ( {
  sourceNumber,
  source,
  lines,
  page,
  lineNumber,
} ) => {
  if ( !source || page - 1 >= source.length - 1 || !lines ) return null


  return lineNumber < lines.length - 1
    ? `/sources/${sourceNumber}/page/${page}/line/${lineNumber + 1}/view`
    : `/sources/${sourceNumber}/page/${page + 1}/line/0/view`
}

const LineView = ( {
  lineNumber,
  sourceNumber,
  page,
  source,
} ) => {
  // 3 dot menu
  const [ menuOpen, setMenuOpen ] = useState( false )
  const toggleMenu = () => setMenuOpen( !menuOpen )

  const closeMenuAfter = fn => () => {
    fn()
    setMenuOpen( false )
  }

  // Line data
  const [ debouncedLineNumber ] = useDebounce( lineNumber, 100 )

  const {
    data: line,
    error: lineError,
  } = useSWR( `${PAGE_API}/${sourceNumber}/page/${page}/line/${debouncedLineNumber}` )

  // Pre-fetch next page + previous page
  useSWR( `${PAGE_API}/${sourceNumber}/page/${page}/line/${debouncedLineNumber - 1}` )
  useSWR( `${PAGE_API}/${sourceNumber}/page/${page}/line/${debouncedLineNumber + 1}` )

  // Page data
  const { data: lines, error: linesError } = useSWR( `${PAGE_API}/${sourceNumber}/page/${page}` )

  const { translations, gurmukhi } = line || {}

  const submitCorrection = () => window.open( getIssueUrl( { page, ...source, ...line } ), 'blank' )

  const { pathname } = useLocation()
  const history = useHistory()

  // Navigation urls
  const sourceViewUrl = pathname.split( '/' ).slice( 0, -1 ).join( '/' )
  const previousLineUrl = getPreviousLineUrl( { sourceNumber, page, lineNumber } )
  const nextLineUrl = getNextLineUrl( { sourceNumber, page, lineNumber, lines, source } )

  // Hotkey handlers
  const goPreviousLine = () => previousLineUrl && history.replace( previousLineUrl )
  const goNextLine = () => nextLineUrl && history.replace( nextLineUrl )
  const goUp = () => history.replace( sourceViewUrl )

  const handlers = { goPreviousLine, goNextLine, goUp }

  const isPreviousPageOverflow = lineNumber >= ( lines || [] ).length

  useEffect( () => {
    if ( !isPreviousPageOverflow || !lines || !line ) return

    history.replace( `/sources/${sourceNumber}/page/${page}/line/${lines.length - 1}/view` )
  }, [ isPreviousPageOverflow, history, line, lines, sourceNumber, page ] )

  const err = linesError || lineError

  return (
    <div className="line-view">

      {err && <Error err={err} />}

      <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges>
        <div className="header">
          <div className="left buttons">
            <LinkButton className="button" icon="level-up-alt" to={sourceViewUrl} />
            <LinkButton className="button" icon="caret-left" disabled={!previousLineUrl} replace to={previousLineUrl} />
          </div>

          <h1>

            {gurmukhi
              ? gurmukhi
                .split( ' ' )
                .map( ( word, index ) => (
                  <a
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    href={getDictionaryLink( stripVishraams( toUnicode( word ) ) )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {word}
                  </a>
                ) )
                .reduce( ( prev, curr ) => [ prev, ' ', curr ] )
              : <Loader size="1em" />}
          </h1>

          <div className="right buttons">

            <LinkButton className="button" icon="caret-right" replace to={nextLineUrl} />

            <Popover
              isOpen={menuOpen}
              onClickOutside={() => setMenuOpen( false )}
              containerClassName="popover-menu"
              content={(
                <Menu>
                  <MenuItem
                    onClick={closeMenuAfter( submitCorrection )}
                  >
                    Submit Correction
                  </MenuItem>
                </Menu>
                )}
              position="bottom"
            >
              <IconButton icon="ellipsis-v" onClick={toggleMenu} />
            </Popover>

          </div>
        </div>

        <div className="content">
          {translations && translations
            .map( translation => (
              <TranslationBlock
                key={translation.translationSourceId}
                {...translation}
              />
            ) )
            .filter( x => x )
            .reverse()}
        </div>

      </GlobalHotKeys>

    </div>
  )
}

LineView.propTypes = {
  page: oneOfType( [ string, number ] ).isRequired,
  sourceNumber: oneOfType( [ string, number ] ).isRequired,
  lineNumber: number.isRequired,
  source: shape( {
    nameEnglish: string,
  } ),
}

LineView.defaultProps = {
  source: null,
}

export default withRouter( LineView )
