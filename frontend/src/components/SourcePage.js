import React, { Component } from 'react'
import { string, oneOfType, number } from 'prop-types'

import { PAGE_API } from '../lib/consts'
import { issueUrl } from '../lib/utils'

import Loader from './Loader'
import LinkButton from './LinkButton'

import './SourcePage.css'
import Error from './Error'

class SourcePage extends Component {
  state = {
    lines: null,
    err: null,
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
      .catch( err => this.setState( { err } ) )
  }

  openIssue = (id, gurmukhi) => {
    const { page, nameEnglish } = this.props
    window.open ( issueUrl( { id, gurmukhi, page, nameEnglish } ) )
  }

  render() {
    const { page, source, length } = this.props
    const { lines, err } = this.state

    return (
      <div className="source-page">
        {err && <Error err={err} />}
        {!( lines || err ) && <Loader />}
        <section className="lines">
          {lines && lines.map( ( { id, gurmukhi }, index ) => (
            <span
              key={id}
              tabIndex={index + 1}
              className="line"
              role="button"
              onClick={() => this.openIssue(id, gurmukhi) }
              onKeyPress={( ( { key } ) => key === 'Enter' && this.openIssue(id, gurmukhi) )}
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
  nameEnglish: string.isRequired,
}

SourcePage.defaultProps = {
  page: 1,
}

export default SourcePage

