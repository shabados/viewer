import { useEffect, useState } from 'react'

import Content from '../components/Content'
import Layout from '../components/Layout'
import { DB_VERSION_API, version } from '../lib/consts'

const About = () => {
  const [ dbVersion, setDbVersion ] = useState<string>()

  useEffect( () => {
    fetch( DB_VERSION_API )
      .then( ( res ) => res.json() )
      .then( setDbVersion )
      .catch( ( err: Error ) => console.error( 'Error fetching DB Version', err ) )
  }, [] )

  return (
    <Layout>
      <Content>
        <h1>About</h1>
        <p>
          Shabad OS Viewer is a web app designed to explore the Shabad OS Database.
          {' '}
          It can be used for research.
          {' '}
          It can be used to proofread.
          {' '}
          It can be used as an audit tool.
        </p>
        <p>
          Features include
          {' '}
          automatically syncing with the latest Database release,
          {' '}
          iterating lines with left and right keyboard hotkeys,
          {' '}
          and looking up words in a dictionary.
        </p>
        <h1>Version</h1>
        <p>
          {!dbVersion
            ? 'Database Version loading...'
            : (
              <>
                <p>
                  <a href="https://github.com/shabados/viewer/releases" className="link">
                    Viewer
                    {' '}
                    {version}
                  </a>
                </p>
                <p>
                  <a href="https://github.com/shabados/database/releases" className="link">
                    Database
                    {' '}
                    {dbVersion}
                  </a>
                </p>
              </>
            )}
        </p>
        <h1>Related</h1>
        <p><a href="https://docs.shabados.com/viewer/" className="link">Viewer Docs</a></p>
        <p><a href="https://docs.shabados.com/database/" className="link">Database Docs</a></p>
        <p><a href="https://github.com/shabados" className="link">Shabad OS GitHub</a></p>
      </Content>
    </Layout>
  )
}

export default About
