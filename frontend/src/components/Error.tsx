import './Error.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ErrProps = {
  err: {
    message: string,
  },
}

const Err = ( { err: { message } }: ErrProps ) => (
  <div className="error">
    <FontAwesomeIcon icon="exclamation-circle" />
    <p className="text">Oh no! Looks like something went wrong.</p>
    <p className="shrug text">¯\_(ツ)_/¯</p>
    <details>{message}</details>
  </div>
)

export default Err
