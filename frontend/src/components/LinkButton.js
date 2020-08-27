import React from 'react'
import { string, bool } from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './LinkButton.css'

const LinkButton = ( { className, icon, to, disabled, ...props } ) => (
  <Link {...props} to={to} className={classNames( 'link-button', className, { disabled } )}>
    <FontAwesomeIcon icon={icon} />
  </Link>
)

LinkButton.propTypes = {
  className: string,
  icon: string.isRequired,
  to: string.isRequired,
  disabled: bool,
}

LinkButton.defaultProps = {
  className: '',
  disabled: false,
}

export default LinkButton
