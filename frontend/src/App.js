import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getPositions } from './lib/utils'
import { SOURCES_API, DB_VERSION_API } from './lib/consts'
import Home from './components/Home'
import SourcePage from './components/SourcePage'
import LineRedirect from './components/LineRedirect'

import './App.css'

class App extends Component {
  state = {
    sources: [],
    err: null,
    dbVersion: '',
  }

  componentDidMount() {
    this.loadSources()
    this.loadDbVersion()
  }

  loadSources = () => fetch( SOURCES_API )
    .then( res => res.json() )
    .then( sources => this.setState( { sources } ) )
    .catch( err => this.setState( { err } ) )

    loadDbVersion = () => fetch( DB_VERSION_API )
      .then( res => res.json() )
      .then( dbVersion => this.setState( { dbVersion } ) )
      .catch( err => this.setState( { err } ) )

    render() {
      const { sources, err, dbVersion } = this.state
      const positions = getPositions()

      return (
        <Router>
          <div className="app">
            <Route exact path="/" render={() => <Home err={err} sources={sources} dbVersion={dbVersion} positions={positions} />} />
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

            <Route
              path="/line/:id"
              render={( { match: { params: { id } } } ) => ( <LineRedirect id={id} /> )}
            />

          </div>
        </Router>
      )
    }
}

export default App
