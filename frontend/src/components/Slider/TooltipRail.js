import React, { Component, Fragment } from 'react'
import { func, string } from 'prop-types'

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
    const { label, getRailProps } = this.props

    return (
      <Fragment>
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
          className="slider-rail all"
          {...getRailProps( {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          } )}
        />
        <div className="slider-rail filled" />
      </Fragment>
    )
  }
}

TooltipRail.propTypes = {
  getEventData: func.isRequired,
  getRailProps: func.isRequired,
  label: string.isRequired,
}

export default TooltipRail
