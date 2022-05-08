import { arrayOf, number, shape, string } from 'prop-types'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import Content from '../components/Content'
import Error from '../components/Error'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Theme from '../components/Theme'

const jss = createUseStyles( {
  sources: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: `calc(2 * ${Theme.Gap})`,
  },
  source: {
    padding: `${Theme.Gap} calc(2 * ${Theme.Gap})`,
    borderRadius: Theme.Gap,
    fontFamily: 'Open Gurbani Akhar',
    fontWeight: 700,
    fontSize: '1.05em',
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transition: Theme.Normally,
    '&:hover': {
      background: 'rgba( 255, 255, 255, 0.9 )',
    },
  },
} )

const getPosition = ( source, positions ) => positions[ source ] || { line: 0, page: 1 }

const Home = ( { err, sources, positions } ) => {
  const css = jss()
  return (
    <Layout>
      <Content>
        <div className={css.sources}>
          {err && <Error err={err} />}
          {!( sources || err ) && <Loader />}
          {sources.map( ( { nameGurmukhi, id } ) => (
            <Link
              key={id}
              className={css.source}
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

Home.propTypes = {
  sources: arrayOf( string ),
  positions: shape( { page: number } ).isRequired,
  err: shape( { message: string } ),
}

Home.defaultProps = {
  sources: null,
  err: null,
}

export default Home
