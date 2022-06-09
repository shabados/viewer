import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { LINE_API } from '../lib/consts'
import { LineResponse } from '../types/api'
import ErrorDialog from './Error'
import Loader from './Loader'

type LineRedirectParams = {
  id: string,
}

const LineRedirect = () => {
  const { id } = useParams<LineRedirectParams>()

  const [ line, setLine ] = useState<LineResponse>()

  useEffect( () => {
    fetch( `${LINE_API}/${id!}` )
      .then( ( res ) => res.json() )
      .then( setLine )
      .catch( ( err ) => console.error( `Failed to retrieve line id ${id!}`, err ) )
  }, [ id ] )

  if ( !line ) return <Loader />

  if ( !line.id ) return <ErrorDialog err={new Error( `Line ID ${id!} does not exist` )} />

  return line
    ? <Navigate to={`/sources/${line.shabad.sourceId}/page/${line.sourcePage}/line/${line.index}`} />
    : <Loader />
}

export default LineRedirect
