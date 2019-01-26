import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { SOURCES_API } from './lib/consts'
import Home from './components/Home'
import SourcePage from './components/SourcePage'

import './App.css'

class App extends Component {
  state = {
    sources: [],
  }

  componentDidMount() {
    this.loadSources()
  }

  loadSources = () => fetch( SOURCES_API )
    .then( res => res.json() )
    .then( sources => this.setState( { sources } ) )
    .catch( err => console.error( err ) )

  render() {
    const { sources } = this.state

    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={() => <Home sources={sources} />} />
          <Route
            path="/sources/:source/page/:page"
            render={( { match: { params: { page, source } } } ) => (
              <SourcePage
                page={page}
                source={source}
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
