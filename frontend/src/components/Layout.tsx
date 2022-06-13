import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'
import Nav from './Nav'

type LayoutProps = {
  children?: ReactNode,
}

const useStyles = createUseStyles( {
  layout: {
    marginTop: theme.Gutter,
  },
} )

const Layout = ( { children }: LayoutProps ) => {
  const classes = useStyles()

  return (
    <>
      <Nav />
      <div className={classes.layout}>
        {children}
      </div>
    </>
  )
}

export default Layout
