import React from 'react'
import { Link } from 'react-router-dom'
import { arrayOf, string, shape } from 'prop-types'

import Loader from './Loader'
import Error from './Error'
import logo from '../media/logo.svg'

import './Home.css'

const Home = ( { err, sources } ) => (
  <div className="home">
    <section className="introduction">
      <img className="logo" src={logo} alt="Shabad OS Logo" />
      <h1>Database Viewer</h1>
      <div className="links">
        <a href="https://github.com/ShabadOS/database-viewer#getting-started" className="button">Getting Started</a>
        <a href="https://github.com/ShabadOS/database-viewer/blob/master/CONTRIBUTING.md" className="button">Contributing</a>
        <a href="https://github.com/ShabadOS/database-viewer#proofs-for-bani" className="button">List of Proofs</a>
        <a href="https://youtu.be/YLtOxh5k7aw" className="button">Tutorial Video</a>
      </div>
    </section>
    <section className="sources">
      {err && <Error err={err} />}
      {!( sources || err ) && <Loader />}
      {sources.map( ( { nameGurmukhi, id } ) => (
        <Link
          key={id}
          className="gurmukhi source"
          to={`/sources/${id}/page/1`}
        >
          {nameGurmukhi}
        </Link>
      ) )}
    </section>
  </div>
)

Home.propTypes = {
  sources: arrayOf( string ),
  err: shape( { message: string } ),
}

Home.defaultProps = {
  sources: null,
  err: null,
}

export default Home
