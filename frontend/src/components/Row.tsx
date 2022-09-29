import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

const useStyles = createUseStyles( {
  row: {
    textDecoration: 'none',
    color: theme.Fg,
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      color: theme.Blue,
    },
    '& + $row': {
      borderTop: [ '1px', 'solid', theme.Separator ],
    },
    '& > *': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  disabled: {
    cursor: 'default',
    color: 'rgba(120, 120, 120, 0.4)',
    '&:hover': {
      color: 'rgba(120, 120, 120, 0.4)',
    },
  },
  '@media (prefers-color-scheme: dark)': {
    row: {
      color: theme.FgDarkScheme,
      '&:hover': {
        color: theme.BlueDarkScheme,
      },
      '& + $row': {
        borderTopColor: theme.SeparatorDarkScheme,
      },
    },
  },
} )

type RowProps = {
  disabled?: boolean,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
  children: ReactNode,
}

const Row = ( { disabled, onClick, children }: RowProps ) => {
  const classes = useStyles()
  return (
    <a
      href="#"
      className={`${classes.row} ${disabled ? classes.disabled : ''}`}
      onClick={( onClick && !disabled ) ? onClick : ( () => null )}
    >
      {children}
    </a>
  )
}

export default Row
