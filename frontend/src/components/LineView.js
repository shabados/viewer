import React, { useEffect, useState } from 'react'
import { shape, string, oneOfType, number, arrayOf } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { location, history } from 'react-router-prop-types'
import classNames from 'classnames'

import { PAGE_API } from '../lib/consts'

import Error from './Error'
import Loader from './Loader'
import LinkButton from './LinkButton'

import './LineView.css'

const languages = {
  english: 1,
  punjabi: 2,
  spanish: 3,
}

const languageFonts = {
  [ languages.english ]: 'latin',
  [ languages.punjabi ]: 'punjabi',
  [ languages.spanish ]: 'latin',
}

const LineView = ( {
  location: { pathname },
  history,
  translationSources,
  line,
  source,
  page,
  length,
} ) => {
  const [ lineData, setData ] = useState()
  const [ loading, setLoading ] = useState( true )
  const [ err, setErr ] = useState()

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

            <h1>{gurmukhi}</h1>
            <LinkButton className="button" icon="caret-right" replace to={nextPageUrl} />
          </div>

          <div className="content">
            {translations
              .filter( ( { translation } ) => translation )
              .map( ( { translationSourceId, translation } ) => {
                const source = translationSources.find( ( { id } ) => translationSourceId === id )

                return (
                  <div className="translation-block" key={translationSourceId}>
                    <h2 className="source-name">{`[${source.language.nameEnglish}] ${source.nameEnglish}`}</h2>

                    <div className="blocks">
                      <p className={classNames( languageFonts[ source.languageId ], 'translation block' )}>{translation}</p>
                      <p className="punjabi translation block">{translation}</p>
                    </div>
                  </div>
                )
              } )}
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
  location: location.isRequired,
  history: history.isRequired,
  line: number.isRequired,
  translationSources: arrayOf( shape( {
    language: shape( { nameEnglish: string } ),
    nameEnglish: string,
  } ) ).isRequired,
}

export default withRouter( LineView )
