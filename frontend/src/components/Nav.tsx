import { createUseStyles } from 'react-jss'

import Content from './Content'
import Logo from './Logo'

const useStyles = createUseStyles( {
  nav: {
    width: '100%',
    background: '#2d2026',
    position: 'fixed',
    color: 'white',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '3rem',
    fontSize: '0.75rem',
  },
} )

const Nav = () => {
  const classes = useStyles()

  return (
    <div className={classes.nav}>
      <Content>
        <div className={classes.flex}>
          <a href="/">
            <Logo />
          </a>
          <div>
            <a href="/about" className="button">About</a>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default Nav
