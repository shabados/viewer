import './TooltipRail.css'

import classNames from 'classnames'
import { useState } from 'react'
import { GetEventData, GetRailProps } from 'react-compound-slider'

import Tooltip from './Tooltip'

type TooltipRailState = {
  value: number | null,
  percent: number | null,
}

type TooltipRailProps = {
  getEventData: GetEventData,
  getRailProps: GetRailProps,
  label: string,
  disabled: boolean,
}

const TooltipRail = ( { getEventData, getRailProps, label, disabled }: TooltipRailProps ) => {
  const [
    { percent, value },
    setState,
  ] = useState<TooltipRailState>( { percent: null, value: null } )

  const onMouseMove = ( event: MouseEvent ) => setState( getEventData( event ) )

  const onMouseEnter = () => document.addEventListener( 'mousemove', onMouseMove )

  const onMouseLeave = () => {
    setState( { value: null, percent: null } )

    document.removeEventListener( 'mousemove', onMouseMove )
  }

  return (
    <>
      {value && (
      <div
        style={{
          ...( percent && { left: `${percent}%` } ),
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
        {...getRailProps( { onMouseEnter, onMouseLeave } )}
      />

      <div className={classNames( 'slider-rail', 'filled', { disabled } )} />
    </>
  )
}

export default TooltipRail
