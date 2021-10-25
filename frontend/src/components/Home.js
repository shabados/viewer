import { Link } from 'react-router-dom'
import { arrayOf, string, number, shape } from 'prop-types'

import Loader from './Loader'
import Error from './Error'
import logo from '../media/logo.svg'
import { version } from '../lib/consts'

import './Home.css'

const getPosition = ( source, positions ) => positions[ source ] || { line: 0, page: 1 }

const Home = ( { err, sources, positions, dbVersion } ) => (
  <div className="home">
    <section className="introduction">
      <img className="logo" src={logo} alt="Shabad OS Logo" />

      <h1>Viewer</h1>
      <h3>{`v${version}`}</h3>

      <h4>{ !dbVersion ? 'Database Version loading...' : `Database Version v${dbVersion}`}</h4>

      <div className="links">
        <a href="https://youtu.be/YLtOxh5k7aw" className="button">Tutorial Video</a>
        <a href="https://tutorials.shabados.com/tutorials/1.0.0/database-viewer/proofreading.html" className="button">Learn to Proofread</a>
      </div>
    </section>

    <section className="sources">
      {err && <Error err={err} />}
      {!( sources || err ) && <Loader />}
      {sources.map( ( { nameGurmukhi, id } ) => (
        <Link
          key={id}
          className="gurmukhi source"
          to={`/sources/${id}/page/${getPosition( id, positions ).page}/line/${getPosition( id, positions ).line}`}
        >
          {nameGurmukhi}
        </Link>
      ) )}
    </section>
  </div>
)

Home.propTypes = {
  sources: arrayOf( string ),
  positions: shape( { page: number } ).isRequired,
  err: shape( { message: string } ),
  dbVersion: string,
}

Home.defaultProps = {
  sources: null,
  err: null,
  dbVersion: null,
}

export default Home
