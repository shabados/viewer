import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

type SeparatorProps = {
  height?: string,
  margin?: string,
}

const useStyles = createUseStyles( {
  separator: {
    width: '100%',
    height: '1px',
    margin: `${theme.Gap} 0 0`,
    padding: 0,
    backgroundColor: `${theme.Separator}`,
  },

  '@media (prefers-color-scheme: dark)': {
    separator: {
      backgroundColor: `${theme.SeparatorDarkScheme}`,
    },
  },

} )

const Separator = ( { height, margin }: SeparatorProps ) => {
  const classes = useStyles()
  return (
    <div className={classes.separator} style={{ height, margin }} />
  )
}

export default Separator
