import './Handle.css'

import classNames from 'classnames'
import { useState } from 'react'
import { GetHandleProps, SliderItem } from 'react-compound-slider'

import Tooltip from './Tooltip'

type HandleProps = {
  tooltipActive?: boolean,
  min: number,
  max: number,
  handle: SliderItem,
  label: string,
  getHandleProps: GetHandleProps,
  disabled?: boolean,
}

const Handle = ( {
  min,
  max,
  handle: { id, value, percent },
  getHandleProps,
  label,
  tooltipActive,
  disabled,
}: HandleProps ) => {
  const [ mouseOver, setMouseOver ] = useState( false )

  const onMouseEnter = () => setMouseOver( true )
  const onMouseLeave = () => setMouseOver( false )

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
          onTouchStart: onMouseEnter,
          onTouchEnd: onMouseLeave,
          onMouseEnter,
          onMouseLeave,
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

export default Handle
