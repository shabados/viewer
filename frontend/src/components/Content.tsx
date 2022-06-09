import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

const useStyles = createUseStyles( {
  content: {
    margin: '0 auto',
    width: `calc(100% - 2 * ${theme.Gutter})`,
    maxWidth: '1080px',
    paddingLeft: theme.Gutter,
    paddingRight: theme.Gutter,
  },
} )

type ContentProps = {
  children?: ReactNode,
}

const Content = ( { children }: ContentProps ) => {
  const classes = useStyles()

  return (
    <div className={classes.content}>{children}</div>
  )
}

export default Content
