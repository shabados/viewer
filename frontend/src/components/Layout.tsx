import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'
import Nav from './Nav'

type LayoutProps = {
  children?: ReactNode,
}

const useStyles = createUseStyles( {
  layout: {
    paddingTop: theme.Gutter,
  },
} )

const Layout = ( { children }: LayoutProps ) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.layout}>
        {children}
      </div>
      <Nav />
    </>
  )
}

export default Layout
