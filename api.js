import { Router } from 'express'

import { getSources } from './db'

const api = Router()

api.get( '/sources', ( _, res ) => (
  getSources()
    .then( sources => res.json( sources ) )
    .catch( err => res.status( 400 ).json( err ) )
) )

export default api
