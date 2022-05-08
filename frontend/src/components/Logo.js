import { number } from 'prop-types'
import { createUseStyles } from 'react-jss'
import logo from '../media/logo.svg'
import Theme from './Theme'

const jss = createUseStyles( {
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginLeft: Theme.BlankSpace,
    fontWeight: 100,
  },
} )

const Logo = ( { size, iconOnly } ) => {
  const css = jss()
  return (
    <span className={css.logo}>
      <img height={size} width={size} src={logo} alt="Shabad OS Logo" />
      {!iconOnly && <span className={css.text} style={{ fontSize: size * 0.666 }}>Viewer</span>}
    </span>
  )
}

Logo.propTypes = {
  size: number,
  iconOnly: Boolean,
}

Logo.defaultProps = {
  size: 20,
  iconOnly: false,
}

export default Logo
