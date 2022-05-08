import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import Theme from './Theme'

const jss = createUseStyles( {
  content: {
    margin: '0 auto',
    width: `calc(100% - 2 * ${Theme.Gutter})`,
    maxWidth: '1080px',
    paddingLeft: Theme.Gutter,
    paddingRight: Theme.Gutter,
  },
} )

const Content = ( { children } ) => {
  const css = jss()
  return (
    <div className={css.content}>{children}</div>
  )
}

Content.propTypes = {
  children: PropTypes.element,
}

Content.defaultProps = {
  children: null,
}

export default Content
