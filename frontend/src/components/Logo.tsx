import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'
import logo from '../media/logo.svg'

const useStyles = createUseStyles( {
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginLeft: theme.BlankSpace,
    fontWeight: 100,
  },
} )

type LogoProps = {
  size?: number,
  iconOnly?: boolean,
}

const Logo = ( { size = 20, iconOnly }: LogoProps ) => {
  const classes = useStyles()

  return (
    <span className={classes.logo}>
      <img height={size} width={size} src={logo} alt="Shabad OS Logo" />
      {!iconOnly && <span className={classes.text} style={{ fontSize: size * 0.666 }}>Viewer</span>}
    </span>
  )
}

export default Logo
