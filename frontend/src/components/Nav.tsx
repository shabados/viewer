import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import theme from '../helpers/theme'
import About from '../screens/About'
import Collections from '../screens/Collections'
import Interface from '../screens/Interface'
import Content from './Content'
import Logo from './Logo'
import Modal from './Modal'

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
    cursor: 'pointer',
    '&:hover': {
      color: theme.Blue,
    },
    '& + $button': {
      marginLeft: '1.5rem',
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
  const [ visibleCollections, setVisibleCollections ] = useState( false )
  const [ visibleAbout, setVisibleAbout ] = useState( false )
  const [ visibleInterface, setVisibleInterface ] = useState( false )

  return (
    <div className={classes.nav}>
      <Content>
        <div className={classes.flex}>
          <Link to="/" className={classes.button}>
            <Logo />
          </Link>
          <div>
            <span
              className={classes.button}
              onClick={() => setVisibleCollections( true )}
            >
              Collections
            </span>
            <span
              className={classes.button}
              onClick={() => setVisibleAbout( true )}
            >
              About
            </span>
            <span
              className={classes.button}
              onClick={() => setVisibleInterface( true )}
            >
              Interface
            </span>
          </div>
        </div>
      </Content>
      <Modal visible={visibleCollections} setVisible={setVisibleCollections}>
        <Collections setVisibleCollections={setVisibleCollections} />
      </Modal>
      <Modal visible={visibleAbout} setVisible={setVisibleAbout}>
        <About />
      </Modal>
      <Modal visible={visibleInterface} setVisible={setVisibleInterface}>
        <Interface />
      </Modal>
    </div>
  )
}

export default Nav
