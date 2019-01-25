import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home'

import './App.css'

class App extends Component {
  state = {}

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    )
  }
}

export default App
