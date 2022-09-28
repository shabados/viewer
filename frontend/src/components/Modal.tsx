import { X } from 'lucide-react'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { createUseStyles } from 'react-jss'

import theme from '../helpers/theme'

type ModalProps = {
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>,
  children?: ReactNode,
}

const useStyles = createUseStyles( {
  modalBackDrop: {
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: `${theme.ModalBackdrop}`,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  modal: {
    zIndex: 3,
    margin: `calc(${theme.Gutter} * .5) auto 0`,
    background: `${theme.ModalBg}`,
    borderRadius: theme.Gap,
    maxWidth: '810px',
    maxHeight: `calc(100% - ${theme.Gutter})`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  close: {
    float: 'right',
    top: 0,
    position: 'sticky',
    padding: `${theme.Gap} ${theme.Gap} 0 0`,
    cursor: 'pointer',
    '&:hover': {
      color: `${theme.Blue}`,
    },
  },
  content: {
    flexGrow: 1,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '@media (prefers-color-scheme: dark)': {
    modalBackDrop: {
      backgroundColor: `${theme.ModalBackdropDarkScheme}`,
    },
    modal: {
      background: `${theme.ModalBgDarkScheme}`,
    },
    close: {
      '&:hover': {
        color: `${theme.BlueDarkScheme}`,
      },
    },
  },
} )

const Modal = ( { visible, setVisible, children }: ModalProps ) => {
  const classes = useStyles()
  const toggleVisibility = () => setVisible( !visible )

  if ( visible ) {
    return (
      <div className={classes.modalBackDrop} onClick={toggleVisibility}>
        <div className={classes.modal} onClick={( e ) => e.stopPropagation()}>
          <div className={classes.content}>
            <div className={classes.close} onClick={toggleVisibility}>
              <X />
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default Modal
