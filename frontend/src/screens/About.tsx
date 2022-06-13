import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import Content from '../components/Content'
import Layout from '../components/Layout'
import theme from '../helpers/theme'
import { DB_VERSION_API, version } from '../lib/consts'

const useStyles = createUseStyles( {
  link: {
    color: theme.Blue,
  },
} )

const About = () => {
  const [ dbVersion, setDbVersion ] = useState<string>()

  useEffect( () => {
    fetch( DB_VERSION_API )
      .then( ( res ) => res.json() )
      .then( setDbVersion )
      .catch( ( err: Error ) => console.error( 'Error fetching DB Version', err ) )
  }, [] )

  const classes = useStyles()

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
                  <a href="https://github.com/shabados/viewer/releases" className={classes.link}>
                    Viewer
                    {' '}
                    {version}
                  </a>
                </p>
                <p>
                  <a href="https://github.com/shabados/database/releases" className={classes.link}>
                    Database
                    {' '}
                    {dbVersion}
                  </a>
                </p>
              </>
            )}
        </p>
        <h1>Related</h1>
        <p><a href="https://docs.shabados.com/viewer/" className={classes.link}>Viewer Docs</a></p>
        <p><a href="https://docs.shabados.com/database/" className={classes.link}>Database Docs</a></p>
        <p><a href="https://github.com/shabados" className={classes.link}>Shabad OS GitHub</a></p>
      </Content>
    </Layout>
  )
}

export default About
