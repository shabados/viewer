import './Menu.css'

import classNames from 'classnames'
import { HTMLAttributes } from 'react'

type MenuProps = {
  className?: string,
} & HTMLAttributes<HTMLUListElement>

const Menu = ( { className, ...props }: MenuProps ) => <ul className={classNames( className, 'menu' )} {...props} />

export default Menu
