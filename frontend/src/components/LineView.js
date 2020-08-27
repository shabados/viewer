import React, { useEffect, useState } from 'react'
import { string, oneOfType, number } from 'prop-types'
import { withRouter, useLocation } from 'react-router-dom'
import { stripVishraams, toUnicode } from 'gurmukhi-utils'

import { PAGE_API } from '../lib/consts'
import { getDictionaryLink } from '../lib/utils'

import Error from './Error'
import Loader from './Loader'
import LinkButton from './LinkButton'
import TranslationBlock from './TranslationBlock'

import './LineView.css'

const LineView = ( {
  line,
  source,
  page,
  length,
} ) => {
  const [ lineData, setData ] = useState()
  const [ loading, setLoading ] = useState( true )
  const [ err, setErr ] = useState()

  const { pathname } = useLocation()

  const sourceViewUrl = pathname.split( '/' ).slice( 0, -1 ).join( '/' )
  const previousPageUrl = page > 0 && `/sources/${source}/page/${page}/line/${+line - 1}/view`
  const nextPageUrl = page < length - 1 && `/sources/${source}/page/${page}/line/${+line + 1}/view`

  useEffect( () => {
    fetch( `${PAGE_API}/${source}/page/${page}/line/${line}` )
      .then( res => res.json() )
      .then( setData )
      .catch( setErr )
      .finally( () => setLoading( false ) )
  }, [ line, source, page, setData ] )

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

            <LinkButton className="button" icon="caret-right" replace to={nextPageUrl} />
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
  source: oneOfType( [ string, number ] ).isRequired,
  length: number.isRequired,
  line: number.isRequired,
}

export default withRouter( LineView )
