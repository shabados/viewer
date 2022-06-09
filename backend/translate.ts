import { v2 } from '@google-cloud/translate'
import memoizee from 'memoizee'

const { GOOGLE_APPLICATION_CREDENTIALS } = process.env

const { Translate } = v2

const translator = new Translate()

export const LANGUAGE_CODES = {
  punjabi: 'pa',
  english: 'en',
} as const

const translate = memoizee(
  ( text: string, from: string, to: string = LANGUAGE_CODES.english ) => translator
    .translate( text, { from, to } )
    .catch( console.error )
    .then( ( [ translation ]: any ) => translation as string ),
  { promise: true, primitive: true },
)

export default GOOGLE_APPLICATION_CREDENTIALS
  ? translate
  : () => ''
