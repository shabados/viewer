import React from 'react'
import ReactDOM from 'react-dom'

import { configure } from 'react-hotkeys'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight, faExclamationCircle, faLevelUpAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import App from './App'
import './index.css'

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
].forEach( icon => library.add( icon ) )

ReactDOM.render( <App />, document.getElementById( 'root' ) )
