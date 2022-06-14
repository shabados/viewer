import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import theme from '../helpers/theme'
import Content from './Content'
import Logo from './Logo'

const useStyles = createUseStyles( {
  nav: {
    width: '100%',
    background: theme.NavBg,
    borderBottom: '1px solid rgba(0% 0% 0% / 5%)',
    position: 'fixed',
    top: 0,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '3rem',
    fontSize: '0.8rem',
  },
  button: {
    '&:hover': {
      color: theme.Blue,
    },
  },
  '@media (prefers-color-scheme: dark)': {
    nav: {
      background: theme.NavBgDarkScheme,
      color: theme.FgDarkScheme,
    },
    button: {
      '&:hover': {
        color: theme.BlueDarkScheme,
      },
    },
  },
} )

const Nav = () => {
  const classes = useStyles()

  return (
    <div className={classes.nav}>
      <Content>
        <div className={classes.flex}>
          <Link to="/" className={classes.button}>
            <Logo />
          </Link>
          <div>
            <Link to="/about" className={classes.button}>About</Link>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default Nav
