import { MicrosoftCognitiveServicesSpeechTranscriber } from './MicrosoftCognitiveServicesSpeechTranscriber'
import { RecordingStateChangeCallback, ResultCallback, Transcriber } from './Transcriber'
import { WebSpeechApiTranscriber } from './WebSpeechApiTranscriber'

export type PositionCallback = ( page: number, line: number ) => void

export class PanktiSelector {
  private static readonly transcriberNameCookieKey = 'TRANSCRIBER_NAME'
  private static readonly msftApiKeyCookieKey = 'SPEECH_KEY'
  private static readonly msftApiregionCookieKey = 'SPEECH_REGION'
  private static readonly openaiApiSecretCookieKey = 'OPENAI_SECRET'

  private static readonly LOOKBACK_LENGTH = 75

  private combinedLines = ''
  private linePositions: number[] = []
  private currentPage = 0

  private prevTranscription = ''

  private lineCallback: PositionCallback

  private transcriber: Transcriber | undefined

  private isRunning = false

  private GetPositionFromTranscriptionResult: ResultCallback = ( newText: string ): void => {
    let needle = this.prevTranscription + this.transcriber.TransformOutput( newText )
    needle = needle.length <= PanktiSelector.LOOKBACK_LENGTH
      ? needle
      : needle.substring( needle.length - PanktiSelector.LOOKBACK_LENGTH )

    this.prevTranscription = needle

    const result = PanktiSelector.fuzzyMatch( needle, this.combinedLines )
    const endPos = result[ 2 ]

    console.log( 'GetPositionFromTranscriptionResult: result=', result, ' needle=', needle, ' match=', this.combinedLines.substring( result[ 1 ], endPos ) )

    for ( let i = 0; i < this.linePositions.length; i += 1 ) {
      if ( this.linePositions[ i ] >= endPos ) {
        this.lineCallback( this.currentPage, i )
        break
      }
    }
  }

  constructor( setPanktiSelectorRunningState ) {
    const transcriberName = PanktiSelector.getCookie( PanktiSelector.transcriberNameCookieKey )
    console.log( 'transcriberName:', transcriberName )

    const recordingCallback: RecordingStateChangeCallback = ( newVal: boolean ): void => {
      this.isRunning = newVal
      console.log( 'Setting state of running to ', newVal )

      setPanktiSelectorRunningState( newVal )
    }

    switch ( transcriberName ) {
      case 'WebSpeechApi':
      case null:
        this.transcriber = new WebSpeechApiTranscriber(
          this.GetPositionFromTranscriptionResult,
          recordingCallback
        )
        break
      case 'MSFT':
        this.transcriber = new MicrosoftCognitiveServicesSpeechTranscriber(
          this.GetPositionFromTranscriptionResult,
          recordingCallback,
          PanktiSelector.getCookie( PanktiSelector.msftApiKeyCookieKey ),
          PanktiSelector.getCookie( PanktiSelector.msftApiregionCookieKey )
        )
        break
      default:
        console.log( `Not a valid Transcriber type name '${transcriberName}'. Skipping...` )
    }
  }

  SetCallback( callback: PositionCallback ): void {
    this.lineCallback = callback
  }

  SetLines( page: number, lines: string[] ): void {
    if ( !( this.transcriber ) ) {
      console.log( 'not setting lines as transcriber is', this.transcriber )
      return
    }

    let newCombinedLines = ''
    const newLinePositions: number[] = []

    lines.forEach( ( line ) => {
      newCombinedLines += `${this.transcriber.TransformInput( line )} `
      newLinePositions.push( newCombinedLines.length )
    } )

    this.combinedLines = newCombinedLines
    this.linePositions = newLinePositions
    this.currentPage = page

    console.log( 'combinedLines:', this.combinedLines )
    console.log( 'linePositions:', this.linePositions )
  }

  ToggleRunningState(): void {
    if ( !( this.transcriber ) ) {
      console.log( 'looks like Transcriber is not yet set.' )
      return
    }

    console.log( 'Previous state of running was ', this.isRunning )

    if ( this.isRunning ) {
      this.transcriber.StopRecording()
    } else {
      this.transcriber.StartRecording()
    }
  }

  private static fuzzyMatch( needle: string, haystack: string ) : [number, number, number] {
    const tuple = PanktiSelector.fuzzyMatchAllResults( needle, haystack )
    const prev = tuple[ 0 ]
    const prevBacktrace = tuple[ 1 ]

    // get the farthest match with same value
    // Note: don't use prev[0] as that value is just to assist the Dynamic Programming
    let pos = prev.length - 1
    for ( let i = prev.length - 2; i > 0; i -= 1 ) {
      if ( prev[ pos ] > prev[ i ] ) {
        pos = i
      }
    }

    // (cost, startPosition, endPosition) where the match is substring [startPosition, endPosition)
    return [ prev[ pos ], prevBacktrace[ pos ], pos ]
  }

  private static fuzzyMatchAllResults( needle: string, haystack: string ) : [number[], number[]] {
    const arrayLength = haystack.length + 1
    let prev: number[] = Array<number>( arrayLength ).fill( 0 )
    let prevBacktrace: number[] = Array<number>( arrayLength ).fill( 0 ).map( ( _, i ) => i )

    let current: number[] = Array<number>( arrayLength ).fill( 0 )
    let currentBacktrace: number[] = Array<number>( arrayLength ).fill( 0 )

    for ( let i = 0; i < needle.length; i += 1 ) {
      const cost = 1 // TODO: update this to use different cost based on what the character is.

      current[ 0 ] = prev[ 0 ] + 1
      currentBacktrace[ 0 ] = 0

      for ( let j = 0; j < arrayLength - 1; j += 1 ) {
      // cost of deleting. If you make this the default option, it will
      // encapsulate the longest match found with backtrace (including garbage chars on edge)
        current[ j + 1 ] = current[ j ] + cost
        currentBacktrace[ j + 1 ] = currentBacktrace[ j ]

        // cost of substitute if needed. If you make this the default option, it will
        // decrease the collection of garbage characters on the edges in
        // the match found with backtrace
        const substitutionCost = prev[ j ] + ( needle[ i ] !== haystack[ j ] ? cost : 0 )
        if ( current[ j + 1 ] > substitutionCost ) {
          current[ j + 1 ] = substitutionCost
          currentBacktrace[ j + 1 ] = prevBacktrace[ j ]
        }

        // cost of inserting
        const insertionCost = prev[ j + 1 ] + cost
        if ( current[ j + 1 ] > insertionCost ) {
          current[ j + 1 ] = insertionCost
          currentBacktrace[ j + 1 ] = prevBacktrace[ j + 1 ]
        }
      }
      const temp = prev
      prev = current
      current = temp

      const tempBacktrace = prevBacktrace
      prevBacktrace = currentBacktrace
      currentBacktrace = tempBacktrace
    }
    return [ prev, prevBacktrace ]
  }

  private static getCookie( name: string ): string | null {
    const cookies = document.cookie.split( '; ' )
    for ( let i = 0; i < cookies.length; i++ ) {
      const [ cookieName, cookieValue ] = cookies[ i ].split( '=' )
      if ( cookieName === name ) {
        return cookieValue
      }
    }
    return null
  }

  public static setCookie( name: string, value: string, days = 1 ): void {
    const expirationDate = new Date()
    expirationDate.setTime( expirationDate.getTime() + days * 24 * 60 * 60 * 1000 )
    const expires = `expires=${expirationDate.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/`
  }
}
