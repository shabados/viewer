import { ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

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
    '& > div': {
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
  to?: string,
  children: ReactNode,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
  disabled?: boolean,
}

const Row = ( { to, disabled, onClick, children }: RowProps ) => {
  const classes = useStyles()
  return (
    <Link
      to={( to && !disabled ) ? to : '#'}
      className={`${classes.row} ${disabled ? classes.disabled : ''}`}
      onClick={( onClick && !disabled ) ? onClick : ( () => null )}
    >
      <div>{children}</div>
      {to && <div><ChevronRight /></div>}
    </Link>
  )
}

export default Row
