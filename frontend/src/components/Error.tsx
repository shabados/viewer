import { AlertCircle } from 'lucide-react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

const useStyles = createUseStyles( {
  error: {
    fontSize: '100px',
    color: theme.Red,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorText: {
    fontSize: '19px',
    color: theme.Fg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorDetails: {
    fontSize: '20px',
    cursor: 'pointer',
  },

  '@media (prefers-color-scheme: dark)': {
    error: {
      color: theme.RedDarkScheme,
    },
    errorText: {
      color: theme.FgDarkScheme,
    },
  },
} )

type ErrProps = {
  err: {
    message: string,
  },
}

const Err = ( { err: { message } }: ErrProps ) => {
  const classes = useStyles()
  return (
    <div className={classes.error}>
      <AlertCircle />
      <p className={classes.errorText}>Oh no! Looks like something went wrong.</p>
      <details className={classes.errorDetails}>{message}</details>
    </div>
  )
}

export default Err
