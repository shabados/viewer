import React from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'

import './MenuItem.css'

const MenuItem = ( { className, ...props } ) => <li className={classNames( className, 'menu-item' )} {...props} />

MenuItem.propTypes = {
  className: string,
}

MenuItem.defaultProps = {
  className: null,
}

export default MenuItem
