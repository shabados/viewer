import { Dispatch, SetStateAction } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

type SliderProps = {
  min: number,
  max: number,
  step: number | string,
  units: string,
  value: number,
  setValue: Dispatch<SetStateAction<number>>,
}

const useStyles = createUseStyles( {
  legend: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    color: `${theme.FgMuted}`,
  },
  value: {
    color: `${theme.Fg}`,
  },
  slider: {
    width: '100%',
  },

  '@media (prefers-color-scheme: dark)': {
    legend: {
      color: `${theme.FgMutedDarkScheme}`,
    },
    value: {
      color: `${theme.FgDarkScheme}`,
    },
  },

} )

const Slider = ( { min, max, step, units, value, setValue }: SliderProps ) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.legend}>
        <span>
          {min}
          {units}
        </span>
        <span className={classes.value}>
          {value}
          {units}
        </span>
        <span>
          {max}
          {units}
        </span>
      </div>
      <input
        className={classes.slider}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        onChange={( e ) => setValue( parseFloat( e.target.value as string ) )}
      />
    </>
  )
}

export default Slider
