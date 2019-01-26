import React from 'react'
import ReactDOM from 'react-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

import App from './App'
import './index.css'

// Import font-awesome icons
[ faCaretLeft, faCaretRight ].forEach( icon => library.add( icon ) )

ReactDOM.render( <App />, document.getElementById( 'root' ) )
