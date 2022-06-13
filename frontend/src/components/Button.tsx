import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles( {
  button: {
    textDecoration: 'none',
    color: 'rgb(0% 49.83% 75.18%)', // lch(50% 66 255)
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
      backgroundColor: 'rgba(120,120,120,0.05)',
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
