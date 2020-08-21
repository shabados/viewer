import { Router } from 'express'

import { getSources, getLinesOnPage, getLine, getDbVersion } from './db'

const api = Router()

api.get( '/sources', ( _, res ) => (
  getSources()
    .then( sources => res.json( sources ) )
    .catch( err => res.status( 400 ).json( err ) )
) )

api.get( '/source/:sourceId/page/:pageId', ( { params: { sourceId, pageId } }, res ) => (
  getLinesOnPage( sourceId, pageId )
    .then( lines => res.json( lines ) )
    .catch( err => res.status( 400 ).json( err ) )
) )

api.get( '/line/:lineId', ( { params: { lineId } }, res ) => (
  getLine( lineId )
    .then( line => res.json( line ) )
    .catch( err => res.status( 400 ).json( err ) )
) )

api.get( '/version', async ( _, res ) => res.json( await getDbVersion() ) )

export default api
