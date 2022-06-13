import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

type AsciiGurmukhiProps = {
  children?: ReactNode,
}

const useStyles = createUseStyles( {
  AsciiGurmukhi: {
    fontFamily: 'Open Gurbani Akhar',
    fontSize: '1.05em',
    fontWeight: 700,
  },
} )

const AsciiGurmukhi = ( { children }: AsciiGurmukhiProps ) => {
  const classes = useStyles()

  return (
    <span className={classes.AsciiGurmukhi}>
      {children}
    </span>
  )
}

export default AsciiGurmukhi
