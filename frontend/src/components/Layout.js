import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import Nav from './Nav'
import Theme from './Theme'

const jss = createUseStyles( {
  layout: {
    paddingTop: `calc(${Theme.Gutter} * 2)`,
    paddingBottom: Theme.Gutter,
  },
} )

const Layout = ( { children } ) => {
  const css = jss()
  return (
    <>
      <Nav />
      <div className={css.layout}>
        {children}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
}

Layout.defaultProps = {
  children: null,
}

export default Layout
