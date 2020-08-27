/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { string, oneOfType, number } from 'prop-types'
import { history, location } from 'react-router-prop-types'
import classNames from 'classnames'
import { GlobalHotKeys } from 'react-hotkeys'
import { debounce } from 'lodash'
import { CSSTransition } from 'react-transition-group'

import { PAGE_API } from '../lib/consts'
import { savePosition } from '../lib/utils'

import Loader from './Loader'
import LinkButton from './LinkButton'
import Error from './Error'
import Slider from './Slider'

import './SourceView.css'

class SourceView extends Component {
  lineRefs = {}

  navigatingTimeout = null

  keyMap = {
    previousLine: [ 'shift+tab', 'left' ],
    nextLine: [ 'tab', 'right' ],
    firstLine: [ 'home' ],
    lastLine: [ 'end' ],
    // belowLine: [ 'down' ],
    // aboveLine: [ 'up' ],
    openLine: [ 'enter' ],
    previousPage: [ 'ctrl+left', 'pageup' ],
    nextPage: [ 'ctrl+right', 'pagedown' ],
    firstPage: [ 'ctrl+home' ],
    lastPage: [ 'ctrl+end' ],
  }

  state = {
    lines: null,
    err: null,
    navigating: false,
    loading: true,
  }

  blockedKeys = [ 'Tab', 'PageUp', 'PageDown' ]

  loadPage = debounce( async () => {
    const { page, source } = this.props

    fetch( `${PAGE_API}/${source}/page/${page}` )
      .then( res => res.json() )
      .then( lines => {
        this.lineRefs = {}
        this.setState( { lines, loading: false } )
      } )
      .catch( err => this.setState( { err, loading: false } ) )
  }, 100 )

  componentDidMount() {
    this.loadPage()

    document.addEventListener( 'keydown', this.blockKeys )
    this.savePosition()
  }

  //! Lots of repetition can be refactored out here
  componentDidUpdate(
    { source: prevSource, page: prevPage, line: prevLine },
    { lines: prevLines },
  ) {
    const { source, page, line } = this.props
    const { lines, loading } = this.state

    if ( prevSource !== source || prevPage !== page ) this.loadPage()

    if ( prevSource !== source || prevPage !== page || prevLine !== line ) this.savePosition()

    if ( lines && lines !== prevLines && !loading ) this.lineRefs[ line ].scrollIntoView( { block: 'center' } )
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.blockKeys )
  }

  blockKeys = event => {
    if ( this.blockedKeys.some( key => event.key === key ) ) event.preventDefault()
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

    // Display current page number
    this.setState( { navigating: true, loading: true } )
    clearTimeout( this.navigatingTimeout )
    this.navigatingTimeout = setTimeout( () => this.setState( { navigating: false } ), 600 )

    if ( page && page !== +currentPage ) history.replace( `/sources/${source}/page/${page}/line/0` )
  }

  nextPage = () => {
    const { page, length } = this.props

    if ( page < length ) this.goToPage( +page + 1 )
  }

  previousPage = () => {
    const { page } = this.props
    if ( page > 1 ) this.goToPage( +page - 1 )
  }

  firstPage = () => this.goToPage( 1 )

  lastPage = () => {
    const { length } = this.props

    this.goToPage( length )
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

  onLineEnter = () => {
    const { location: { pathname }, history } = this.props

    history.push( `${pathname}/view` )
  }


  belowLine = () => {
    const { line } = this.props

    const lineRef = this.lineRefs[ line ]
    const { offsetTop, offsetLeft } = lineRef
    const { scrollY } = window

    // Scroll element into view
    lineRef.scrollIntoView( { block: 'center' } )

    // Calculate element's relative y position to viewport
    const styles = getComputedStyle( lineRef )
    const [ lineHeight ] = styles[ 'line-height' ].split( 'px' )
    const relativeY = offsetTop - scrollY

    // Get below the line element and index
    const element = document.elementFromPoint( offsetLeft + 4, +lineHeight + relativeY )

    const [ index ] = Object
      .entries( this.lineRefs )
      .find( ( [ , line ] ) => line === element )
    || [ line ]

    this.focusLine( index )
  }

  aboveLine = () => {
    const { line } = this.props

    const lineRef = this.lineRefs[ line ]
    const { offsetTop, offsetLeft } = lineRef
    const { scrollY } = window

    // Scroll element into view
    lineRef.scrollIntoView( { block: 'center' } )

    // Calculate element's relative y position to viewport
    const relativeY = offsetTop - scrollY

    // Get above the line element and index
    const element = document.elementFromPoint( offsetLeft + 4, relativeY - 4 )

    const [ index ] = Object
      .entries( this.lineRefs )
      .find( ( [ , line ] ) => line === element )
    || [ line ]

    this.focusLine( index )
  }

  // eslint-disable-next-line react/sort-comp
  handlers = {
    previousLine: this.previousLine,
    nextLine: this.nextLine,
    firstLine: this.firstLine,
    lastLine: this.lastLine,
    belowLine: this.belowLine,
    aboveLine: this.aboveLine,
    previousPage: this.previousPage,
    nextPage: this.nextPage,
    firstPage: this.firstPage,
    lastPage: this.lastPage,
    openLine: this.onLineEnter,
  }

  render() {
    const { line, page, pageNameGurmukhi, source, length } = this.props
    const { lines, err, navigating, loading } = this.state

    return (
      <div className="source-view">

        {err && <Error err={err} />}
        {loading && !( lines || err ) && <Loader />}

        <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
          <CSSTransition
            in={!loading}
            timeout={200}
            classNames="fade"
          >
            <section className="lines">

              {lines && lines.map( ( { id, gurmukhi }, index ) => (
                <Link key={id} to={`${index}/view`}>
                  <span
                    ref={ref => { this.lineRefs[ index ] = ref }}
                    className={classNames( 'line', { focused: +line === index && !loading } )}
                    tabIndex={0}
                    role="button"
                  >
                    {gurmukhi}
                  </span>
                </Link>
              ) )}

            </section>
          </CSSTransition>

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
              tooltipActive={navigating}
              disabled={length === 1}
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

SourceView.propTypes = {
  page: oneOfType( [ string, number ] ),
  source: oneOfType( [ string, number ] ).isRequired,
  length: number.isRequired,
  pageNameGurmukhi: string.isRequired,
  history: history.isRequired,
  location: location.isRequired,
  line: number,
}

SourceView.defaultProps = {
  page: 1,
  line: 0,
}

export default withRouter( SourceView )
