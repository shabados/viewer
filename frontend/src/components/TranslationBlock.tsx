/* eslint-disable
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions
*/

import { useContext } from 'react'
import { createUseStyles } from 'react-jss'

import { TranslationSourcesContext } from '../lib/contexts'
import { Translation } from '../types/api'

const useStyles = createUseStyles( {
  sourceName: {
    fontWeight: '500',
  },
  blocks: {
    fontFamily: 'Mukta Mahee',
    fontWeight: 300,
  },
} )

const languages = {
  english: 1,
  punjabi: 2,
}

const languageFonts = {
  [ languages.english ]: 'latin',
  [ languages.punjabi ]: 'punjabi',
}

type TranslationBlockProps = Translation

const TranslationBlock = ( {
  translationSourceId,
  translation,
  english,
  additionalInformation,
}: TranslationBlockProps ) => {
  const translationSources = useContext( TranslationSourcesContext )
  const source = translationSources.find( ( { id } ) => translationSourceId === id )

  const classes = useStyles()

  if (
    !source
    || !Object.values( languages ).includes( source.languageId )
    || !translation
  ) return null

  return (
    <>
      <h2 className={`cy-source-name ${classes.sourceName}`}>{`${source.nameEnglish}`}</h2>

      <div className={classes.blocks}>
        <p className={`${languageFonts[ source.languageId ]} translation`}>{translation}</p>

        {additionalInformation.map( ( { name, information } ) => (
          <p key={name} className={`${languageFonts[ source.languageId ]} translation`}>
            {[ name, information ].join( '. ' )}
          </p>
        ) )}

        <p>{english}</p>

        {additionalInformation
          .filter( ( { english } ) => english )
          .map( ( { name, english } ) => (
            <p key={name}>
              {[ name, english ].join( '. ' )}
            </p>
          ) )}

      </div>
    </>
  )
}

export default TranslationBlock
