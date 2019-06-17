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
import Slider from './Slider'

import './SourcePage.css'

class SourcePage extends Component {
  state = {
    lines: null,
    err: null,
    focused: null,
  }

  lineRefs = {}

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

    document.addEventListener( 'keydown', this.blockTab )
  }

  componentDidUpdate( { source: prevSource, page: prevPage } ) {
    const { source, page } = this.props

    if ( prevSource !== source || prevPage !== page ) this.loadPage()
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.blockTab )
  }

  blockTab = event => {
    if ( event.key === 'Tab' ) event.preventDefault()
  }

  focusLine = focused => {
    this.setState( { focused } )
    this.lineRefs[ focused ].scrollIntoView( { block: 'center' } )
  }

  goToPage = page => {
    const { history, source } = this.props

    if ( page ) history.push( `/sources/${source}/page/${page}` )
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
    const { lines, focused } = this.state

    if ( focused < lines.length - 1 ) this.focusLine( focused + 1 )
    else this.nextPage()
  }

  previousLine = () => {
    const { focused } = this.state

    if ( focused > 0 ) this.focusLine( focused - 1 )
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
        this.setState( { lines, focused: 0 } )
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
    const { page, pageNameGurmukhi, source, length } = this.props
    const { focused, lines, err } = this.state

    return (
      <div className="source-page">
        {err && <Error err={err} />}
        {!( lines || err ) && <Loader />}
        <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
          <section className="lines">
            {lines && lines.map( ( { id, gurmukhi }, index ) => (
              <span
                ref={ref => { this.lineRefs[ index ] = ref }}
                className={classNames( 'line', { focused: focused === index } )}
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
              to={`/sources/${source}/page/${+page - 1}`}
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
