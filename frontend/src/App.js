import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { getPositions } from './lib/utils'
import { SOURCES_API, DB_VERSION } from './lib/consts'
import Home from './components/Home'
import SourcePage from './components/SourcePage'

import './App.css'

const App = () => {
  const [ sources, setSources ] = useState( [] )
  const [ err, setErr ] = useState( null )
  const [ dbVersion, setDbVersion ] = useState( '' )
  const positions = getPositions()

  const loadSources = () => fetch( SOURCES_API )
    .then( res => res.json() )
    .then( sources => setSources( sources ) )
    .catch( err => setErr( err ) )

  const loadDbVersion = () => fetch( DB_VERSION )
    .then( res => res.json() )
    .then( dbVersion => setDbVersion( dbVersion ) )
    .catch( err => setErr( err ) )

  useEffect( () => {
    loadSources()
    loadDbVersion()
  }, [] )

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
      </div>
    </Router>
  )
}

export default App
