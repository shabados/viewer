import { string, number } from 'prop-types'

import './Tooltip.css'

const Tooltip = ( { label, value } ) => (
  <div className="tooltip">
    <span className="tooltip-text">{`${label} ${value}`}</span>
  </div>
)

Tooltip.propTypes = {
  label: string.isRequired,
  value: number.isRequired,
}

export default Tooltip
