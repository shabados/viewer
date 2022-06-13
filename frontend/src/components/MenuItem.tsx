import classNames from 'classnames'
import { HTMLAttributes } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles( {
  menuItem: {
    padding: '1em',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#dddddd',
    },
  },
} )

type MenuItemProps = {
  className?: string,
} & HTMLAttributes<HTMLLIElement>

const MenuItem = ( { className, ...props }: MenuItemProps ) => {
  const classes = useStyles()

  return <li className={classNames( className, 'cy-menu-item', classes.menuItem )} {...props} />
}

export default MenuItem
