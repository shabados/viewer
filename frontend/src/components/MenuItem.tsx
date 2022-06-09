import './MenuItem.css'

import classNames from 'classnames'
import { HTMLAttributes } from 'react'

type MenuItemProps = {
  className?: string,
} & HTMLAttributes<HTMLLIElement>

const MenuItem = ( { className, ...props }: MenuItemProps ) => <li className={classNames( className, 'menu-item' )} {...props} />

export default MenuItem
