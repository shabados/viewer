import './App.css'

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import LineRedirect from './components/LineRedirect'
import { SOURCES_API, TRANSLATION_SOURCES_API } from './lib/consts'
import { TranslationSourcesContext } from './lib/contexts'
import { getLastOpened, getPosition } from './lib/utils'
import NotFound from './screens/404'
import LineView from './screens/LineView'
import SourceView from './screens/SourceView'
import { SourcesResponse, TranslationSourcesResponse } from './types/api'
import withContexts from './with-contexts'

const App = () => {
  const [ sources, setSources ] = useState<SourcesResponse>( [] )
  const [ translationSources, setTranslationSources ] = useState<TranslationSourcesResponse>( [] )
  const [ , setErr ] = useState<Error>()

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

  const gapTime = Date.now() - getLastOpened()
  // const tooLong = 1.21 * ( 10 ** 9 )
  const tooLong = 20000
  const position = ( gapTime < ( tooLong ) ) ? getPosition() : '/sources/1/page/1/line/0'

  return withContexts(
    <TranslationSourcesContext.Provider value={translationSources}>
      <div className="app">
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />

            <Route path="/" element={<Navigate to={position} />} />

            <Route
              path="/sources/:source/page/:page/line/:line/view"
              element={<LineView sources={sources} />}
            />

            <Route
              path="/sources/:source/page/:page/line/:line"
              element={<SourceView sources={sources} />}
            />

            <Route
              path="/sources/:source/page/:page"
              element={<Navigate to="line/0" />}
            />

            <Route
              path="/sources/:source"
              element={<Navigate to="page/1/line/0" />}
            />

            <Route path="/line/:id" element={<LineRedirect />} />
          </Routes>
        </Router>
      </div>
    </TranslationSourcesContext.Provider>
  )
}

export default App
