/* eslint-disable
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions
*/

import { useContext, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { TranslationSourcesContext } from '../lib/contexts'
import { Translation } from '../types/api'

const useStyles = createUseStyles( {
  translationBlock: {
    borderBottom: '1px solid #c4c4c4',
    fontFamily: 'Mukta Mahee',
    fontWeight: 300,
    '&:first-child': {
      borderTop: '1px solid #c4c4c4',
    },
  },
  sourceName: {
    fontSize: '1em',
    fontWeight: '500',
    cursor: 'pointer',
    userSelect: 'none',
    margin: '0',
    padding: '1em 0',
    '&:hover': {
      background: '#dccda280',
    },
  },
  blocks: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  block: {
    width: '47%',
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
  const [ expanded, setExpanded ] = useState( true )

  const toggleExpanded = () => setExpanded( !expanded )

  const translationSources = useContext( TranslationSourcesContext )
  const source = translationSources.find( ( { id } ) => translationSourceId === id )

  const classes = useStyles()

  if (
    !source
    || !Object.values( languages ).includes( source.languageId )
    || !translation
  ) return null

  return (
    <div className={classes.translationBlock}>
      <h2 className={`cy-source-name ${classes.sourceName}`} onClick={toggleExpanded}>{`[${source.language.nameEnglish}] ${source.nameEnglish}`}</h2>

      {expanded && (
      <div className={`${expanded ? 'expanded' : ''} blocks`}>
        <div className={classes.block}>
          <p className={`${languageFonts[ source.languageId ]} translation`}>{translation}</p>

          {additionalInformation.map( ( { name, information } ) => (
            <p key={name} className={`${languageFonts[ source.languageId ]} translation`}>
              {[ name, information ].join( '. ' )}
            </p>
          ) )}
        </div>

        <div className={classes.block}>
          <p>{english}</p>

          {additionalInformation
            .filter( ( { english } ) => english )
            .map( ( { name, english } ) => (
              <p key={name}>
                {[ name, english ].join( '. ' )}
              </p>
            ) )}

        </div>
      </div>
      )}
    </div>
  )
}

export default TranslationBlock
