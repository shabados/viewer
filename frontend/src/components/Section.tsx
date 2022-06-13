import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

const useStyles = createUseStyles( {
  section: {
    paddingTop: theme.Gutter,
    paddingBottom: theme.Gutter,
  },
} )

type SectionProps = {
  children?: ReactNode,
}

const Section = ( { children }: SectionProps ) => {
  const classes = useStyles()

  return (
    <div className={classes.section}>{children}</div>
  )
}

export default Section
