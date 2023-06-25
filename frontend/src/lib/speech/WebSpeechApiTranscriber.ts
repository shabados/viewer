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

  constructor( callback: ResultCallback, recordingCallback: RecordingStateChangeCallback ) {
    super( callback, recordingCallback )

    const recognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new recognitionClass()
    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.lang = 'hi-IN'

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

  StartRecording(): void {
    this.recognition.start()
  }

  StopRecording(): void {
    this.recognition.stop()
  }
}
