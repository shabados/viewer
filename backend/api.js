import { Router } from 'express'

import { getSources, getLinesOnPage, getLine, getDbVersion, getLineOnPage, getTranslationSources } from './db'

const api = Router()

const withRes = fn => ( req, res ) => fn( req, res )
  .then( data => res.json( data ) )
  .catch( error => {
    console.error( error )
    res.status( 404 ).json( error.message )
  } )

api.get( '/sources', withRes( getSources ) )

api.get( '/translationSources', withRes( getTranslationSources ) )

api.get( '/source/:sourceId/page/:pageId', withRes( ( { params: { sourceId, pageId } } ) => getLinesOnPage( sourceId, pageId ) ) )

api.get( '/source/:sourceId/page/:pageId/line/:lineId', withRes( ( { params: { sourceId, pageId, lineId } } ) => getLineOnPage( sourceId, pageId, lineId ) ) )

api.get( '/line/:lineId', withRes( ( { params: { lineId } } ) => getLine( lineId ) ) )

api.get( '/version', withRes( getDbVersion ) )

export default api
