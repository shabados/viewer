import React, { Component } from 'react'
import { string, oneOfType, number } from 'prop-types'

import { PAGE_API } from '../lib/consts'

import Loader from './Loader'

import './SourcePage.css'

class SourcePage extends Component {
  state = {
    lines: [],
  }

  componentDidMount() {
    this.loadPage()
  }

  loadPage = () => {
    const { page, source } = this.props

    fetch( `${PAGE_API}/${source}/page/${page}` )
      .then( res => res.json() )
      .then( lines => this.setState( { lines } ) )
      .catch( err => console.error( err ) )
  }

  render() {
    const { lines } = this.state

    return (
      <div className="source-page">
        {!lines.length && <Loader />}
        <section className="lines">
          {lines.map( ( { gurmukhi } ) => <span className="line">{gurmukhi}</span> )}
        </section>
      </div>
    )
  }
}

SourcePage.propTypes = {
  page: oneOfType( [ string, number ] ),
  source: oneOfType( [ string, number ] ).isRequired,
  length: number.isRequired,
  pageNameGurmukhi: string.isRequired,
  nameGurmukhi: string.isRequired,
}

SourcePage.defaultProps = {
  page: 1,
}

export default SourcePage
