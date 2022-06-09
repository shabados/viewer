import './App.css'

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LineRedirect from './components/LineRedirect'
import { SOURCES_API, TRANSLATION_SOURCES_API } from './lib/consts'
import { TranslationSourcesContext } from './lib/contexts'
import { getPositions } from './lib/utils'
import About from './screens/About'
import Home from './screens/Home'
import LineView from './screens/LineView'
import SourceView from './screens/SourceView'
import { SourcesResponse, TranslationSourcesResponse } from './types/api'
import withContexts from './with-contexts'

const App = () => {
  const [ sources, setSources ] = useState<SourcesResponse>( [] )
  const [ translationSources, setTranslationSources ] = useState<TranslationSourcesResponse>( [] )
  const [ err, setErr ] = useState<Error>()

  useEffect( () => {
    const API_DATA = [
      [ SOURCES_API, setSources ],
      [ TRANSLATION_SOURCES_API, setTranslationSources ],
    ] as const

    API_DATA.forEach( ( [ api, set ] ) => void fetch( api )
      .then( ( res ) => res.json() )
      .then( set )
      .catch( setErr ) )
  }, [] )

  const positions = getPositions()

  return withContexts(
    <TranslationSourcesContext.Provider value={translationSources}>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home err={err} sources={sources} positions={positions} />} />

            <Route path="/about" element={<About />} />

            <Route
              path="/sources/:source/page/:page/line/:line/view"
              element={<LineView sources={sources} />}
            />

            <Route
              path="/sources/:source/page/:page/line/:line"
              element={<SourceView sources={sources} />}
            />

            <Route path="/line/:id" element={<LineRedirect />} />
          </Routes>
        </Router>
      </div>
    </TranslationSourcesContext.Provider>
  )
}

export default App
