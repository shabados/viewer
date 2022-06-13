import classNames from 'classnames'
import { HTMLAttributes } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles( {
  menu: {
    listStyle: 'none',
    background: '#ffffff',
    border: '1px solid #c4c4c4',
    padding: '0',
  },

} )

type MenuProps = {
  className?: string,
} & HTMLAttributes<HTMLUListElement>

const Menu = ( { className, ...props }: MenuProps ) => {
  const classes = useStyles()

  return <ul className={classNames( className, classes.menu )} {...props} />
}

export default Menu
