import React from 'react'
import { string, func, number } from 'prop-types'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'

import Handle from './Handle'
import TooltipRail from './TooltipRail'

import './index.css'

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const PageSlider = ( { min, max, value, onChange, label } ) => (
  <div className="slider">
    <Slider
      mode={1}
      step={1}
      domain={[ min, max ]}
      rootStyle={sliderStyle}
      onChange={onChange}
      values={[ value ]}
    >
      <Rail>{railProps => <TooltipRail {...railProps} label={label} />}</Rail>
      <Handles>
        {( { handles, getHandleProps } ) => (
          <div className="slider-handles">
            {handles.map( handle => (
              <Handle
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
                label={label}
                min={min}
                max={max}
              />
            ) )}
          </div>
        )}
      </Handles>
      <Tracks right={false}>
        {( { tracks, getTrackProps } ) => (
          <div className="slider-tracks">
            {tracks.map( ( { id, source, target } ) => (
              <div
                key={id}
                className="track"
                style={{
                  left: `${source.percent}%`,
                  width: `${target.percent - source.percent}%`,
                }}
                {...getTrackProps()}
              />
            ) )}
          </div>
        )}
      </Tracks>
    </Slider>
  </div>
)

PageSlider.propTypes = {
  onChange: func,
  min: number.isRequired,
  max: number.isRequired,
  value: number.isRequired,
  label: string.isRequired,
}

PageSlider.defaultProps = {
  onChange: () => {},
}

export default PageSlider
