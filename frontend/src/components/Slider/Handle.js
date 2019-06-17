import React, { Component, Fragment } from 'react'
import { number, string, func, shape, bool } from 'prop-types'

import Tooltip from './Tooltip'

import './Handle.css'

class Handle extends Component {
  state = { mouseOver: false }

  onMouseEnter = () => this.setState( { mouseOver: true } )

  onMouseLeave = () => this.setState( { mouseOver: false } )

  render() {
    const {
      min,
      max,
      handle: { id, value, percent },
      getHandleProps,
      label,
      tooltipActive,
    } = this.props

    const { mouseOver } = this.state

    return (
      <Fragment>
        {( mouseOver || tooltipActive ) && (
          <div
            style={{
              left: `${percent}%`,
              position: 'absolute',
              marginLeft: '-11px',
              marginTop: '-35px',
            }}
          >
            <Tooltip label={label} value={value} />
          </div>
        )}
        <div
          className="slider-handle hover"
          style={{ left: `${percent}%` }}
          {...getHandleProps( id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          } )}
        />
        <div
          className="slider-handle filled"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{ left: `${percent}%` }}
        />
      </Fragment>
    )
  }
}

Handle.propTypes = {
  tooltipActive: bool,
  min: number.isRequired,
  max: number.isRequired,
  handle: shape( {
    id: string,
    value: number,
    percent: number,
  } ).isRequired,
  label: string.isRequired,
  getHandleProps: func.isRequired,
}

Handle.defaultProps = {
  tooltipActive: false,
}

export default Handle
