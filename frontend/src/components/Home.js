import React from 'react'
import { arrayOf, string } from 'prop-types'

import logo from '../media/logo.svg'

import './Home.css'

const Home = ( { sources } ) => (
  <div className="home">
    <section className="introduction">
      <img className="logo" src={logo} alt="Shabad OS Logo" />
      <h1>Database Viewer</h1>
      <div className="links">
        <a href="#" className="button">Getting Started</a>
        <a href="#" className="button">Contributing</a>
        <a href="#" className="button">List of Proofs</a>
        <a href="#" className="button">Tutorial Video</a>
      </div>
    </section>
    <section className="sources">
      {sources.map( source => <div className="gurmukhi source">{source}</div> )}
    </section>
  </div>
)

Home.propTypes = {
  sources: arrayOf( string ),
}

Home.defaultProps = {
  sources: [],
}

export default Home
