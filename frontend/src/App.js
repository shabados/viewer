import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getPositions } from './lib/utils'
import { SOURCES_API, DB_VERSION } from './lib/consts'
import Home from './components/Home'
import SourcePage from './components/SourcePage'

import './App.css'

class App extends Component {
  state = {
    sources: [],
    err: null,
    version: '',
  }

  componentDidMount() {
    this.loadSources()
    this.loadDbVersion()
  }

  loadSources = () => fetch( SOURCES_API )
    .then( res => res.json() )
    .then( sources => this.setState( { sources } ) )
    .catch( err => this.setState( { err } ) )

    loadDbVersion = () => fetch( DB_VERSION )
      .then( res => res.json() )
      .then( version => this.setState( { version } ) )
      .catch( err => this.setState( { err } ) )

    render() {
      const { sources, err, version } = this.state
      const positions = getPositions()

      return (
        <Router>
          <div className="app">
            <Route exact path="/" render={() => <Home err={err} sources={sources} version={version} positions={positions} />} />
            <Route
              path="/sources/:source/page/:page/line/:line"
              render={( { match: { params: { page, source, line } } } ) => (
                <SourcePage
                  page={page}
                  source={source}
                  line={line}
                  {...sources.find( ( { id } ) => id === +source )}
                />
              )
            }
            />
          </div>
        </Router>
      )
    }
}

export default App
