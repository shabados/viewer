import './Error.css'

import { AlertCircle } from 'lucide-react'

type ErrProps = {
  err: {
    message: string,
  },
}

const Err = ( { err: { message } }: ErrProps ) => (
  <div className="error">
    <AlertCircle />
    <p className="text">Oh no! Looks like something went wrong.</p>
    <details>{message}</details>
  </div>
)

export default Err
