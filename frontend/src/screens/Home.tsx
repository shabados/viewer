import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import Content from '../components/Content'
import Error from '../components/Error'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import theme from '../helpers/theme'
import { Positions } from '../lib/utils'
import { Source } from '../types/api'

const useStyles = createUseStyles( {
  sources: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: `calc(2 * ${theme.Gap})`,
  },
  source: {
    padding: `${theme.Gap} calc(2 * ${theme.Gap})`,
    borderRadius: theme.Gap,
    fontFamily: 'Open Gurbani Akhar',
    fontWeight: 700,
    fontSize: '1.05em',
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transition: theme.Normally,
    '&:hover': {
      background: 'rgba( 255, 255, 255, 0.9 )',
    },
  },
} )

const getPosition = (
  source: number,
  positions: Positions
) => positions[ source ] ?? { line: 0, page: 1 }

type HomeProps = {
  err?: Error,
  sources?: Source[],
  positions: Positions,
}

const Home = ( { err, sources, positions }: HomeProps ) => {
  const classes = useStyles()

  return (
    <Layout>
      <Content>
        <div className={classes.sources}>
          {err && <Error err={err} />}

          {!( sources || err ) && <Loader />}

          {sources?.map( ( { nameGurmukhi, id } ) => (
            <Link
              key={id}
              className={classes.source}
              to={`/sources/${id}/page/${getPosition( id, positions ).page}/line/${getPosition( id, positions ).line}`}
            >
              {nameGurmukhi}
            </Link>
          ) )}
        </div>
      </Content>
    </Layout>
  )
}

export default Home
