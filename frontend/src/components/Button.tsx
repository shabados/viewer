import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

const useStyles = createUseStyles( {
  button: {
    textDecoration: 'none',
    color: theme.Blue,
    boxSizing: 'border-box',
    minWidth: '3rem',
    minHeight: '3rem',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.4)',
    },
  },
  disabled: {
    cursor: 'default',
    color: 'rgba(120, 120, 120, 0.4)',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '@media (pointer: coarse)': {
    button: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:active': {
        backgroundColor: 'rgba(255,255,255,0.4)',
      },
    },
  },
  '@media (prefers-color-scheme: dark)': {
    button: {
      color: theme.BlueDarkScheme,
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
    },
    disabled: {
      color: 'rgba(120, 120, 120, 0.4)',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  '@media (pointer: coarse) and (prefers-color-scheme: dark)': {
    button: {
      '&:hover': {
        backgroundColor: 'transparent', // @bhajneet idk why it has to be repeated to work
      },
      '&:active': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
    },
  },
} )

type ButtonProps = {
  children: ReactNode,
  disabled?: boolean,
}

const Button = ( { disabled, children }: ButtonProps ) => {
  const classes = useStyles()
  return (
    <div className={`${classes.button} ${disabled ? classes.disabled : ''}`}>
      {children}
    </div>
  )
}

export default Button
