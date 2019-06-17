import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { string, oneOfType, number } from 'prop-types'
import { history } from 'react-router-prop-types'
import classNames from 'classnames'
import { GlobalHotKeys } from 'react-hotkeys'

import { PAGE_API } from '../lib/consts'
import { issueUrl, savePosition } from '../lib/utils'

import Loader from './Loader'
import LinkButton from './LinkButton'
import Error from './Error'
import Slider from './Slider'

import './SourcePage.css'

class SourcePage extends Component {
  lineRefs = {}

  keyMap = {
    previousLine: [ 'shift+tab', 'left' ],
    nextLine: [ 'tab', 'right' ],
    firstLine: [ 'pageup' ],
    lastLine: [ 'pagedown' ],
    previousPage: [ 'ctrl+left' ],
    nextPage: [ 'ctrl+right' ],
  }

  state = {
    lines: null,
    err: null,
  }

  componentDidMount() {
    this.loadPage()

    document.addEventListener( 'keydown', this.blockTab )
    this.savePosition()
  }

  componentDidUpdate( { source: prevSource, page: prevPage, line: prevLine } ) {
    const { source, page, line } = this.props

    if ( prevSource !== source || prevPage !== page ) this.loadPage()

    if ( prevSource !== source || prevPage !== page || prevLine !== line ) {
      this.savePosition()
      this.lineRefs[ line ].scrollIntoView( { block: 'center' } )
    }
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.blockTab )
  }

  blockTab = event => {
    if ( event.key === 'Tab' ) event.preventDefault()
  }

  savePosition = () => {
    const { page, source, line } = this.props

    savePosition( +source, +page, +line )
  }

  focusLine = line => {
    const { source, page, history } = this.props

    history.replace( `/sources/${source}/page/${page}/line/${line}` )
  }

  goToPage = page => {
    const { history, source, page: currentPage } = this.props

    if ( page && page !== +currentPage ) history.push( `/sources/${source}/page/${page}/line/0` )
  }

  nextPage = () => {
    const { page, length } = this.props

    if ( page < length ) this.goToPage( +page + 1 )
  }

  previousPage = () => {
    const { page } = this.props
    if ( page > 1 ) this.goToPage( +page - 1 )
  }

  nextLine = () => {
    const { line } = this.props
    const { lines } = this.state

    if ( line < lines.length - 1 ) this.focusLine( +line + 1 )
    else this.nextPage()
  }

  previousLine = () => {
    const { line } = this.props

    if ( line > 0 ) this.focusLine( +line - 1 )
    else this.previousPage()
  }

  firstLine = () => this.focusLine( 0 )

  lastLine = () => {
    const { lines } = this.state

    this.focusLine( lines.length - 1 )
  }

  openIssue = ( id, gurmukhi ) => {
    const { source, page, nameEnglish } = this.props
    window.open( issueUrl( { id, gurmukhi, source, page, nameEnglish } ) )
  }

  loadPage = async () => {
    const { page, source } = this.props

    fetch( `${PAGE_API}/${source}/page/${page}` )
      .then( res => res.json() )
      .then( lines => {
        this.lineRefs = {}
        this.setState( { lines } )
        window.scrollTo( 0, 0 )
      } )
      .catch( err => this.setState( { err } ) )
  }

  onLineClick = ( { index, id, gurmukhi } ) => {
    this.openIssue( id, gurmukhi )

    this.focusLine( index )
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
    const { line, page, pageNameGurmukhi, source, length } = this.props
    const { lines, err } = this.state

    return (
      <div className="source-page">
        {err && <Error err={err} />}
        {!( lines || err ) && <Loader />}
        <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
          <section className="lines">
            {lines && lines.map( ( { id, gurmukhi }, index ) => (
              <span
                ref={ref => { this.lineRefs[ index ] = ref }}
                className={classNames( 'line', { focused: +line === index } )}
                key={id}
                tabIndex={0}
                role="button"
                onClick={() => this.onLineClick( { id, gurmukhi, index } )}
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
              to={`/sources/${source}/page/${+page - 1}/line/0`}
              disabled={page <= 1}
            />
            <Slider
              min={1}
              max={length}
              value={page}
              label={pageNameGurmukhi}
              onChange={( [ page ] ) => this.goToPage( page )}
            />
            <LinkButton
              className="right button"
              icon="caret-right"
              to={`/sources/${source}/page/${+page + 1}/line/0`}
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
  line: number,
}

SourcePage.defaultProps = {
  page: 1,
  line: 0,
}

export default withRouter( SourcePage )
