import { stripVishraams } from 'gurmukhi-utils'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

type AsciiGurmukhiProps = {
  form?: Form,
  text: string,
}

export const enum Form {
  plain,
  continuous,
  syntactical,
}

const useStyles = createUseStyles( {
  AsciiGurmukhi: {
    fontFamily: 'Open Gurbani Akhar',
    fontSize: '1.05em',
    fontWeight: 700,
  },

  heavy: {
    color: theme.HeavyVishraam,
  },

  medium: {
    color: theme.MediumVishraam,
  },

  light: {
    color: theme.LightVishraam,
  },

  '@media (prefers-color-scheme: dark)': {
    heavy: {
      color: theme.HeavyVishraamDarkScheme,
    },

    medium: {
      color: theme.MediumVishraamDarkScheme,
    },

    light: {
      color: theme.LightVishraamDarkScheme,
    },
  },
} )

const SyntacticalGurmukhi = ( { text }: { text: string } ) => {
  const classes = useStyles()

  return (
    <span className={classes.AsciiGurmukhi}>
      {text.split( ' ' ).map( ( word, index, array ) => {
        if ( word.endsWith( ';' ) ) {
          return <span className={classes.heavy}>{`${word.slice( 0, -1 )} `}</span>
        }
        if ( word.endsWith( ',' ) ) {
          return <span className={classes.medium}>{`${word.slice( 0, -1 )} `}</span>
        }
        if ( word.endsWith( '.' ) ) {
          return <span className={classes.light}>{`${word.slice( 0, -1 )} `}</span>
        }
        if ( index === array.length - 1 ) {
          return word
        }
        return `${word} `
      } )}
    </span>
  )
}

const AsciiGurmukhi = ( { form = Form.plain, text }: AsciiGurmukhiProps ) => {
  const classes = useStyles()

  if ( form === Form.continuous ) {
    return (
      <span className={classes.AsciiGurmukhi}>
        {stripVishraams( text ).replaceAll( ' ', '' )}
      </span>
    )
  }

  if ( form === Form.syntactical ) {
    return <SyntacticalGurmukhi text={text} />
  }

  // if ( form === Form.plain )
  return (
    <span className={classes.AsciiGurmukhi}>
      {stripVishraams( text )}
    </span>
  )
}

export default AsciiGurmukhi
