import { AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk'

import { RecordingStateChangeCallback, ResultCallback, Transcriber } from './Transcriber'

// This calls the Cognitive Services API, and will need a user to generate their own
// resource in Azure portal.
// Note: You can just use WebSpeechApi in Edge and will see similar results for free,
// and hence only use this if you want to use MSFT provider on non-edge browser
export class MicrosoftCognitiveServicesSpeechTranscriber extends Transcriber {
  private speechRecognizer: SpeechRecognizer | undefined

  constructor(
    callback: ResultCallback,
    recordingCallback: RecordingStateChangeCallback,
    speechKey: string,
    speechRegion: string
  ) {
    super( callback, recordingCallback )

    const speechConfig = SpeechConfig.fromSubscription(
      speechKey,
      speechRegion
    )
    speechConfig.speechRecognitionLanguage = 'hi-IN'
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput()
    this.speechRecognizer = new SpeechRecognizer( speechConfig, audioConfig )

    this.speechRecognizer.recognizing = ( s, e ) => {
      if ( e.result.reason === ResultReason.RecognizingSpeech ) {
        console.log( `Interim Transcription: ${e.result.text}` )
        callback( e.result.text )
      }
    }

    this.speechRecognizer.sessionStarted = ( s, e ) => {
      this.m_recordingStateChangeCallback( true )
    }

    this.speechRecognizer.sessionStopped = ( s, e ) => {
      this.m_recordingStateChangeCallback( false )
    }
  }

  StartRecording(): void {
    this.speechRecognizer?.startContinuousRecognitionAsync( () => {
      console.log( 'Transcribing speech. Press Ctrl+C to stop.' )
    } )
  }

  StopRecording(): void {
    this.speechRecognizer?.stopContinuousRecognitionAsync( () => {
      console.log( 'Transcription stopped.' )
      this.speechRecognizer?.close()
    } )
  }
}
