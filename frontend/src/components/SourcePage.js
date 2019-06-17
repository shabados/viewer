import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { string, oneOfType, number } from 'prop-types'
import { history } from 'react-router-prop-types'
import classNames from 'classnames'
import { GlobalHotKeys } from 'react-hotkeys'

import { PAGE_API } from '../lib/consts'
import { issueUrl } from '../lib/utils'

import Loader from './Loader'
import LinkButton from './LinkButton'
import Error from './Error'

import './SourcePage.css'

class SourcePage extends Component {
  state = {
    lines: null,
    err: null,
    focused: null,
  }

  keyMap = {
    previousLine: [ 'shift+tab', 'left' ],
    nextLine: [ 'tab', 'right' ],
    firstLine: [ 'pageup' ],
    lastLine: [ 'pagedown' ],
    previousPage: [ 'ctrl+left' ],
    nextPage: [ 'ctrl+right' ],
  }

  componentDidMount() {
    this.loadPage()
  }

  componentDidUpdate( { source: prevSource, page: prevPage } ) {
    const { source, page } = this.props

    if ( prevSource !== source || prevPage !== page ) this.loadPage()
  }

  nextPage = () => {
    const { history, page, source, length } = this.props

    if ( page < length ) history.push( `/sources/${source}/page/${+page + 1}` )
  }

  previousPage = () => {
    const { history, page, source } = this.props
    if ( page > 1 ) history.push( `/sources/${source}/page/${+page - 1}` )
  }

  nextLine = () => {
    const { lines, focused } = this.state

    if ( focused < lines.length - 1 ) this.setState( { focused: focused + 1 } )
    else this.nextPage()
  }

  previousLine = () => {
    const { focused } = this.state

    if ( focused > 0 ) this.setState( { focused: focused - 1 } )
    else this.previousPage()
  }

  firstLine = () => this.setState( { focused: 0 } )

  lastLine = () => {
    const { lines } = this.state

    this.setState( { focused: lines.length - 1 } )
  }

  openIssue = ( id, gurmukhi ) => {
    const { source, page, nameEnglish } = this.props
    window.open( issueUrl( { id, gurmukhi, source, page, nameEnglish } ) )
  }

  loadPage = async () => {
    const { page, source } = this.props

    fetch( `${PAGE_API}/${source}/page/${page}` )
      .then( res => res.json() )
      .then( lines => this.setState( { lines, focused: 0 } ) )
      .then( () => window.scrollTo( 0, 0 ) )
      .catch( err => this.setState( { err } ) )
  }

  // eslint-disable-next-line react/sort-comp
  handlers = {
    previousLine: this.previousLine,
    nextLine: this.nextLine,
    firstLine: this.firstLine,
    lastLine: this.lastLine,
    previousPage: this.previousPage,
    nextPage: this.nextPage,
  }

  render() {
    const { page, source, length } = this.props
    const { focused, lines, err } = this.state

    return (
      <div className="source-page">
        {err && <Error err={err} />}
        {!( lines || err ) && <Loader />}
        <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
          <section className="lines">
            {lines && lines.map( ( { id, gurmukhi }, index ) => (
              <span
                className={classNames( 'line', { focused: focused === index } )}
                key={id}
                tabIndex={focused === index ? 1 : -1}
                role="button"
                onClick={() => this.openIssue( id, gurmukhi )}
                onKeyPress={( ( { key } ) => key === 'Enter' && this.openIssue( id, gurmukhi ) )}
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
        </GlobalHotKeys>
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
  history: history.isRequired,
}

SourcePage.defaultProps = {
  page: 1,
}

export default withRouter( SourcePage )
