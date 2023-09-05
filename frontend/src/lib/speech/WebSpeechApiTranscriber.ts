import { stripEndings, stripVishraams, toUnicode } from 'gurmukhi-utils'

import { RecordingStateChangeCallback, ResultCallback, Transcriber } from './Transcriber'

// This uses the inbuilt browswer's WebSpeechApi, and hence could use a different service
// under the hood depending on the browswer. Hence some perform better than others.
//
// Example:
// - Chrome uses a version of Google cloud Speech-to-text
// - Edge uses Microsoft Cognitive Service's Speech-to-text
//
// In my tests, Chrome gives faster results but stops after some time (under a minute) and
// needs to restart it, while Edge on the other hand is slower will continue to work.
export class WebSpeechApiTranscriber extends Transcriber {
  private recognition

  private usePunjabi

  constructor(
    callback: ResultCallback,
    recordingCallback: RecordingStateChangeCallback,
    usePunjabi: boolean
  ) {
    super( callback, recordingCallback )

    this.usePunjabi = usePunjabi

    if ( usePunjabi ) {
      console.log( 'WebSpeechApiTranscriber: Using Punjabi language' )
    } else {
      console.log( 'WebSpeechApiTranscriber: Using Hindi language' )
    }

    const recognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new recognitionClass()
    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.lang = usePunjabi ? 'pa-Guru-IN' : 'hi-IN'

    this.recognition.onstart = () => {
      this.m_recordingStateChangeCallback( true )
    }

    this.recognition.onerror = ( event ) => {
      console.log( 'onerror in recording (WebSpeechApi): ', event )
    }

    this.recognition.onend = () => {
      this.m_recordingStateChangeCallback( false )
    }

    this.recognition.onresult = ( event ) => {
      let interim_transcript = ''
      for ( let i = event.resultIndex; i < event.results.length; ++i ) {
        interim_transcript += event.results[ i ][ 0 ].transcript
      }
      callback( interim_transcript )
    }
  }

  TransformInput( input: string ): string {
    if ( this.usePunjabi ) {
      return stripEndings( stripVishraams( toUnicode( input ) ) )
    }
    return super.TransformInput( input )
  }

  StartRecording(): void {
    this.recognition.start()
  }

  StopRecording(): void {
    this.recognition.stop()
  }
}
