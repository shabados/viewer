import React, { Component } from 'react'
import { func, string, bool } from 'prop-types'
import classNames from 'classnames'

import Tooltip from './Tooltip'

import './TooltipRail.css'

class TooltipRail extends Component {
  state = {
    value: null,
    percent: null,
  }

  onMouseEnter = () => {
    document.addEventListener( 'mousemove', this.onMouseMove )
  }

  onMouseLeave = () => {
    this.setState( { value: null, percent: null } )

    document.removeEventListener( 'mousemove', this.onMouseMove )
  }

  onMouseMove = event => {
    const { getEventData } = this.props

    this.setState( getEventData( event ) )
  }

  render() {
    const { value, percent } = this.state
    const { label, getRailProps, disabled } = this.props

    return (
      <>
        {value && (
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
          className={classNames( 'slider-rail', 'all', { disabled } )}
          {...getRailProps( {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          } )}
        />
        <div className={classNames( 'slider-rail', 'filled', { disabled } )} />
      </>
    )
  }
}

TooltipRail.propTypes = {
  disabled: bool,
  getEventData: func.isRequired,
  getRailProps: func.isRequired,
  label: string.isRequired,
}

TooltipRail.defaultProps = {
  disabled: false,
}

export default TooltipRail
