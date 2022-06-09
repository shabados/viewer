import './IconButton.css'

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { ButtonHTMLAttributes, forwardRef, Ref } from 'react'

type IconButtonProps = {
  className?: string,
  icon: FontAwesomeIconProps['icon'],
} & ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = forwardRef( (
  { className, icon, ...props }: IconButtonProps,
  ref: Ref<HTMLButtonElement>
) => (
  <button ref={ref} className={classNames( className, 'icon-button' )} type="button" {...props}>
    <FontAwesomeIcon icon={icon} />
  </button>
) )

export default IconButton
