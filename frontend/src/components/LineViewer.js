import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shape, string } from 'prop-types'
import { isEmpty } from 'lodash'

import { LINE_API } from '../lib/consts'
import { desierialzeObject } from '../lib/utils'
import Error from './Error'
import Loader from './Loader'
import LinkButton from './LinkButton'
import './LineViewer.css'

const Header = ( { line } ) => {
  const { gurmukhi } = line

  return (
    <div className="line">
      <LinkButton
        className="left button"
        icon="caret-left"
        to="/"
      />
      <h1>{gurmukhi}</h1>
      <LinkButton
        className="right button"
        icon="caret-right"
        to="/"
      />
    </div>
  )
}

Header.propTypes = {
  line: shape( { gurmukhi: string } ).isRequired,
}

const Content = ( { line } ) => {
  const { translations } = line

  const showAdditionalInfo = obj => ( isEmpty( obj ) ? null : JSON.stringify( obj, null, 2 ) )

  return (
    <div className="content">
      {translations.map( ( { translationSourceId, additionalInformation, translation } ) => (

        <div key={translationSourceId}>
          <p>
            {` Source Id: ${translationSourceId} -> ${translation}`}
          </p>
          <pre>
            { showAdditionalInfo( desierialzeObject( additionalInformation ) )}
          </pre>

        </div>
      ) )}
    </div>
  )
}

Content.propTypes = {
  line: shape( { } ).isRequired,
}

const LineViewer = () => {
  const { lineId } = useParams()
  const [ line, setLine ] = useState( null )
  const [ loading, setLoading ] = useState( true )
  const [ err, setErr ] = useState( null )

  useEffect( () => {
    fetch( `${LINE_API}/${lineId}` )
      .then( res => res.json() )
      .then( lines => {
        setLine( lines[ 0 ] )
        setLoading( false )
      } )
      .catch( err => {
        setErr( err )
        setLoading( false )
      } )
  }, [ lineId ] )

  return (
    <div className="line-viewer">
      {err && <Error err={err} />}
      {loading && !( line || err ) && <Loader />}
      {line && (
        <>
          <Header line={line} />
          <Content line={line} />
        </>
      )}


    </div>
  )
}

export default LineViewer
