import React from 'react'
import { string, shape } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Error.css'

const Err = ( { err: { message } } ) => (
  <div className="error">
    <FontAwesomeIcon icon="exclamation-circle" />
    <p className="text">Oh no! Looks like something went wrong.</p>
    <p className="shrug text">¯\_(ツ)_/¯</p>
    <details>{message}</details>
  </div>
)

Err.propTypes = {
  err: shape( { message: string } ),
}

Err.defaultProps = {
  err: { message: '' },
}

export default Err
