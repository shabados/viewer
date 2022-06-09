import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight, faEllipsisV, faExclamationCircle, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { configure } from 'react-hotkeys'

import App from './App'

configure( {
  // Allow holding down a key
  ignoreRepeatedEventsWhenKeyHeldDown: false,
} )

// Import font-awesome icons
;[
  faCaretLeft,
  faCaretRight,
  faExclamationCircle,
  faLevelUpAlt,
  faEllipsisV,
].forEach( ( icon ) => library.add( icon ) )

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
