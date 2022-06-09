import './Tooltip.css'

type TooltipProps = {
  label: string,
  value: number,
}

const Tooltip = ( { label, value }: TooltipProps ) => (
  <div className="tooltip">
    <span className="tooltip-text">{`${label} ${value}`}</span>
  </div>
)

export default Tooltip
