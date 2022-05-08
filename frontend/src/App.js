import { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SWRConfig } from 'swr'

import { getPositions } from './lib/utils'
import { SOURCES_API, TRANSLATION_SOURCES_API, DB_VERSION_API } from './lib/consts'
import { TranslationSourcesContext } from './lib/contexts'
import Home from './screens/Home'
import SourceView from './screens/SourceView'
import LineView from './screens/LineView'
import LineRedirect from './helpers/LineRedirect'

import './App.css'
import About from './screens/About'

const API_DATA = [
  [ SOURCES_API, 'sources' ],
  [ DB_VERSION_API, 'dbVersion' ],
  [ TRANSLATION_SOURCES_API, 'translationSources' ],
]

class App extends Component {
  state = {
    sources: [],
    translationSources: [],
    err: null,
    dbVersion: '',
  }

  componentDidMount() {
    API_DATA.forEach( params => this.loadApi( ...params ) )
  }

  loadApi = ( endpoint, key ) => fetch( endpoint )
    .then( res => res.json() )
    .then( res => this.setState( { [ key ]: res } ) )
    .catch( err => this.setState( { err } ) )

  render() {
    const { sources, translationSources, err, dbVersion } = this.state
    const positions = getPositions()

    const withContexts = [
      [ TranslationSourcesContext.Provider, translationSources ],
      [
        SWRConfig,
        {
          revalidateOnFocus: false,
          fetcher: ( ...args ) => fetch( ...args ).then( res => res.json() ),
        },
      ],
    ].reduce( ( withContexts, [ Provider, value ] ) => children => withContexts(
      <Provider value={value}>{children}</Provider>,
    ), context => context )

    return withContexts(
      <div className="app">
        <Router>
          <Switch>

            <Route exact path="/" render={() => <Home err={err} sources={sources} dbVersion={dbVersion} positions={positions} />} />

            <Route exact path="/about" render={() => <About dbVersion={dbVersion} />} />

            <Route
              path="/sources/:source/page/:page/line/:line/view"
              render={( { match: { params: { page, source, line } } } ) => (
                <LineView
                  source={sources.find( ( { id } ) => id === +source )}
                  page={+page}
                  sourceNumber={+source}
                  lineNumber={+line}
                />
              )}
            />
            <Route
              path="/sources/:source/page/:page/line/:line"
              render={( { match: { params: { page, source, line } } } ) => (
                <SourceView
                  {...sources.find( ( { id } ) => id === +source )}
                  page={+page}
                  source={+source}
                  line={+line}
                />
              )}
            />

            <Route path="/line/:id" render={( { match: { params: { id } } } ) => <LineRedirect id={id} />} />

          </Switch>
        </Router>
      </div>,
    )
  }
}

export default App
