import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { configure } from 'react-hotkeys'

import App from './App'

configure( {
  // Allow holding down a key
  ignoreRepeatedEventsWhenKeyHeldDown: false,
} )

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
