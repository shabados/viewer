import React, { useEffect, useState } from 'react'
import { string, oneOfType, number, shape } from 'prop-types'
import { withRouter, useLocation } from 'react-router-dom'
import Popover from 'react-tiny-popover'
import { stripVishraams, toUnicode } from 'gurmukhi-utils'

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

const LineView = ( {
  lineNumber,
  sourceNumber,
  page,
  source,
  length,
} ) => {
  const [ menuOpen, setMenuOpen ] = useState( false )
  const toggleMenu = () => setMenuOpen( !menuOpen )

  const [ lineData, setData ] = useState()
  const [ loading, setLoading ] = useState( true )
  const [ err, setErr ] = useState()

  const { pathname } = useLocation()

  const sourceViewUrl = pathname.split( '/' ).slice( 0, -1 ).join( '/' )
  const previousPageUrl = page > 0 && `/sources/${sourceNumber}/page/${page}/line/${+lineNumber - 1}/view`
  const nextPageUrl = page < length - 1 && `/sources/${sourceNumber}/page/${page}/line/${+lineNumber + 1}/view`

  const closeMenuAfter = fn => () => {
    fn()
    setMenuOpen( false )
  }

  const submitCorrection = () => window.open( getIssueUrl( { page, ...source, ...lineData } ), 'blank' )

  useEffect( () => {
    fetch( `${PAGE_API}/${sourceNumber}/page/${page}/line/${lineNumber}` )
      .then( res => res.json() )
      .then( setData )
      .catch( setErr )
      .finally( () => setLoading( false ) )
  }, [ lineNumber, sourceNumber, page, setData ] )

  const { translations, gurmukhi } = lineData || {}

  return (
    <div className="line-view">

      {err && <Error err={err} />}
      {loading && !lineData && !err && <Loader />}

      {lineData && (
        <>
          <div className="header">
            <div className="left buttons">
              <LinkButton className="button" icon="level-up-alt" to={sourceViewUrl} />
              <LinkButton className="button" icon="caret-left" replace to={previousPageUrl} />
            </div>

            <h1>
              {gurmukhi
                .split( ' ' )
                .map( word => (
                  <a
                    key={word}
                    href={getDictionaryLink( stripVishraams( toUnicode( word ) ) )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {word}
                  </a>
                ) )
                .reduce( ( prev, curr ) => [ prev, ' ', curr ] )}
            </h1>

            <div className="right buttons">

              <LinkButton className="button" icon="caret-right" replace to={nextPageUrl} />

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
            {translations
              .map( translation => (
                <TranslationBlock
                  key={translation.translationSourceId}
                  {...translation}
                />
              ) )
              .filter( x => x )
              .reverse()}
          </div>

        </>
      )}

    </div>
  )
}

LineView.propTypes = {
  page: oneOfType( [ string, number ] ).isRequired,
  sourceNumber: oneOfType( [ string, number ] ).isRequired,
  length: number.isRequired,
  lineNumber: number.isRequired,
  source: shape( {
    nameEnglish: string,
  } ).isRequired,
}

export default withRouter( LineView )
