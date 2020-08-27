import React, { forwardRef } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './IconButton.css'

const IconButton = forwardRef( ( { className, icon, ...props }, ref ) => (
  <button ref={ref} className={classNames( className, 'icon-button' )} type="button" {...props}>
    <FontAwesomeIcon icon={icon} />
  </button>
) )

IconButton.propTypes = {
  className: string,
  icon: string.isRequired,
}

IconButton.defaultProps = {
  className: null,
}

export default IconButton
