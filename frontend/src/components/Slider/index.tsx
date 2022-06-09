import './index.css'

import { Handles, Rail, Slider, Tracks } from 'react-compound-slider'

import Handle from './Handle'
import TooltipRail from './TooltipRail'

type PageSliderProps = {
  onChange?: ( values: readonly number[] ) => void,
  min: number,
  max: number,
  value: number,
  label: string,
  tooltipActive?: boolean,
  disabled?: boolean,
}

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const PageSlider = ( {
  min,
  max,
  value,
  onChange = () => {},
  label,
  tooltipActive = false,
  disabled = false,
}: PageSliderProps ) => (
  <div className="slider">
    <Slider
      mode={1}
      step={1}
      domain={[ min, max ]}
      rootStyle={sliderStyle}
      onChange={onChange}
      values={[ value ]}
    >
      <Rail>
        {( railProps ) => (
          <TooltipRail {...railProps} label={label} disabled={disabled} />
        )}
      </Rail>

      <Handles>
        {( { handles, getHandleProps } ) => (
          <div className="slider-handles">
            {handles.map( ( handle ) => (
              <Handle
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
                label={label}
                min={min}
                max={max}
                tooltipActive={tooltipActive}
                disabled={disabled}
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

export default PageSlider
