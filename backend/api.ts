import { Request, Response, Router } from 'express'
import fetch from 'node-fetch'

import { getDbVersion, getLine, getLineOnPage, getLinesOnPage, getSources, getTranslationSources } from './db'

const api = Router()

const withRes = (
  fn: ( req: Request, res: Response ) => Promise<any>
) => ( req: Request, res: Response ) => void fn( req, res )
  .then( ( data ) => res.json( data ) )
  .catch( ( error: Error ) => {
    console.error( error )
    res.status( 404 ).json( error.message )
  } )

api.get( '/sources', withRes( getSources ) )

api.get( '/translationSources', withRes( getTranslationSources ) )

api.get( '/source/:sourceId/page/:pageId', withRes( ( { params: { sourceId, pageId } } ) => getLinesOnPage( +sourceId, +pageId ) ) )

api.get( '/source/:sourceId/page/:pageId/line/:lineId', withRes( ( { params: { sourceId, pageId, lineId } } ) => getLineOnPage( +sourceId, +pageId, +lineId ) ) )

api.get( '/line/:lineId', withRes( ( { params: { lineId } } ) => getLine( lineId ) ) )

api.get( '/version', withRes( getDbVersion ) )

api.get( '/auth/msft/speech2text/:key/:region', ( req, res ) => {
  res.setHeader( 'Content-Type', 'application/json' )
  const speechKey = req.params.key
  const speechRegion = req.params.region

  const headers = {
    'Ocp-Apim-Subscription-Key': speechKey,
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  // const headers = {
  //   headers: {
  //     'Ocp-Apim-Subscription-Key': speechKey,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  // }

  try {
    fetch(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: 'POST',
        headers,
      }
    ).then( ( response ) => response.text() ).then( ( data ) => {
      res.send( { token: data } )
    } )
    // const tokenResponse = await axios.post( `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers )
    // res.send( { token: tokenResponse.data } )
  } catch ( err ) {
    res.status( 401 ).send( 'There was an error trying to get the token.' )
  }
} )

export default api
