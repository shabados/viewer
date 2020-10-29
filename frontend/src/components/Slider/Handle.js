import React, { Component } from 'react'
import { number, string, func, shape, bool } from 'prop-types'
import classNames from 'classnames'

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
      disabled,
    } = this.props

    const { mouseOver } = this.state

    return (
      <>
        {!disabled && ( mouseOver || tooltipActive ) && (
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
          className={classNames( 'slider-handle', 'hover', { disabled } )}
          style={{ left: `${percent}%` }}
          {...getHandleProps( id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onTouchStart: this.onMouseEnter,
            onTouchEnd: this.onMouseLeave,
          } )}
        />
        <div
          className={classNames( 'slider-handle', 'filled', { disabled } )}
          role="slider"
          aria-label="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{ left: `${percent}%` }}
        />
      </>
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
  disabled: bool,
}

Handle.defaultProps = {
  tooltipActive: false,
  disabled: false,
}

export default Handle
