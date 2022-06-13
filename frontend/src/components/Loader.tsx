import { createUseStyles } from 'react-jss'

type LoaderProps = {
  size?: string,
}

const useStyles = createUseStyles( {
  ring: {
    display: 'inline-block',
    position: 'relative',
    fontSize: '1rem',
    width: '1em',
    height: '1em',
  },

  div: {
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    width: '1em',
    height: '1em',
    border: '0.2rem solid',
    borderColor: '#db5c87 transparent transparent transparent',
    borderRadius: '50%',
    animationName: '$ring',
    animation: '$ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',

    '&:nth-child(1)': {
      animationDelay: '-0.45s',
    },

    '&:nth-child(2)': {
      animationDelay: '-0.3s',
    },

    '&:nth-child(3)': {
      animationDelay: '-0.15s',
    },
  },

  '@keyframes ring': {

    from: {
      transform: 'rotate(0deg)',
    },

    to: {
      transform: 'rotate(360deg)',
    },
  },
} )

const Loader = ( { size: fontSize = '1rem' }: LoaderProps ) => {
  const classes = useStyles()

  return (
    <div className={classes.ring} style={{ fontSize }}>
      <div className={classes.div} />
      <div className={classes.div} />
      <div className={classes.div} />
      <div className={classes.div} />
    </div>
  )
}

export default Loader
