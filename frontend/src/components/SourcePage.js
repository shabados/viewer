import React, { Component } from 'react'
import { string, oneOfType, number } from 'prop-types'

import { PAGE_API } from '../lib/consts'
import { issueUrl } from '../lib/utils'

import Loader from './Loader'
import LinkButton from './LinkButton'

import './SourcePage.css'

class SourcePage extends Component {
  state = {
    lines: null,
  }

  componentDidMount() {
    this.loadPage()
  }

  componentDidUpdate( { source: prevSource, page: prevPage } ) {
    const { source, page } = this.props

    if ( prevSource !== source || prevPage !== page ) this.loadPage()
  }

  loadPage = () => {
    const { page, source } = this.props

    fetch( `${PAGE_API}/${source}/page/${page}` )
      .then( res => res.json() )
      .then( lines => this.setState( { lines } ) )
      .catch( err => console.error( err ) )
  }

  render() {
    const { page, source, length } = this.props
    const { lines } = this.state

    return (
      <div className="source-page">
        {!lines && <Loader />}
        <section className="lines">
          {lines && lines.map( ( { id, gurmukhi }, index ) => (
            <span
              tabIndex={index + 1}
              className="line"
              role="button"
              onClick={() => window.open( issueUrl( { id, gurmukhi, page, source } ) )}
              onKeyPress={( ( { key } ) => key === 'Enter' && window.open( issueUrl( { id, gurmukhi, page, source } ) ) )}
            >
              {gurmukhi}
            </span>
          ) )}
        </section>
        <section className="controls">
          <LinkButton
            className="left button"
            icon="caret-left"
            to={`/sources/${source}/page/${+page - 1}`}
            disabled={page <= 1}
          />
          <LinkButton
            className="right button"
            icon="caret-right"
            to={`/sources/${source}/page/${+page + 1}`}
            disabled={page >= length}
          />
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
