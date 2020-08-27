import React from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'

import './Menu.css'

const Menu = ( { className, ...props } ) => <ul className={classNames( className, 'menu' )} {...props} />

Menu.propTypes = {
  className: string,
}

Menu.defaultProps = {
  className: null,
}

export default Menu
