import { AlertCircle } from 'lucide-react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles( {
  error: {
    fontSize: '100px',
    color: 'rgba(255, 0, 50, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  errorText: {
    fontSize: '19px',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorDetails: {
    fontSize: '20px',
    outline: 'none',
    cursor: 'pointer',
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
