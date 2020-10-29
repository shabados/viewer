import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { string } from 'prop-types'

import { LINE_API } from '../lib/consts'

import Loader from './Loader'
import ErrorDialog from './Error'

const LineRedirect = ( { id } ) => {
  const [ line, setLine ] = useState()

  useEffect( () => {
    fetch( `${LINE_API}/${id}` )
      .then( res => res.json() )
      .then( setLine )
  }, [ id ] )

  if ( !line ) return <Loader />

  if ( !line.id ) return <ErrorDialog err={new Error( `Line ID ${id} does not exist` )} />

  return line
    ? <Redirect to={`/sources/${line.shabad.sourceId}/page/${line.sourcePage}/line/${line.index}`} />
    : <Loader />
}

LineRedirect.propTypes = {
  id: string.isRequired,
}

export default LineRedirect
