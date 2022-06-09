import './LinkButton.css'

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Link, LinkProps } from 'react-router-dom'

type LinkButtonProps = Omit<LinkProps, 'to'> & {
  className?: string,
  icon: FontAwesomeIconProps['icon'],
  disabled?: boolean,
  to?: string | null,
}

const LinkButton = ( { className, icon, to, disabled, ...props }: LinkButtonProps ) => (
  <Link {...props} to={to ?? ''} className={classNames( 'link-button', className, { disabled } )}>
    <FontAwesomeIcon icon={icon} />
  </Link>
)

export default LinkButton
