import { v2 } from '@google-cloud/translate'
import memoizee from 'memoizee'

const { GOOGLE_APPLICATION_CREDENTIALS } = process.env

const { Translate } = v2

const translator = new Translate()

export const LANGUAGE_CODES = {
  punjabi: 'pa',
  english: 'en',
}

const translate = memoizee(
  ( text, from, to = LANGUAGE_CODES.english ) => translator
    .translate( text, { from, to } )
    .catch( console.error )
    .then( ( [ translation ] ) => translation ),
  { promise: true, primitive: true },
)

export default GOOGLE_APPLICATION_CREDENTIALS
  ? translate
  : () => ''
