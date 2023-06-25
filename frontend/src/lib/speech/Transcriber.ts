import { stripEndings, stripVishraams, toHindi, toUnicode } from 'gurmukhi-utils'

export type ResultCallback = ( result: string ) => void
export type RecordingStateChangeCallback = ( newState: boolean ) => void

export abstract class Transcriber {
  protected m_callback: ResultCallback
  protected m_recordingStateChangeCallback: RecordingStateChangeCallback

  constructor(
    callback: ResultCallback,
    recordingStateChangeCallback: RecordingStateChangeCallback
  ) {
    this.m_callback = callback
    this.m_recordingStateChangeCallback = recordingStateChangeCallback
  }

  abstract StartRecording() : void
  abstract StopRecording() : void

  TransformInput( input: string ): string {
    return toHindi( stripEndings( stripVishraams( toUnicode( input ) ) ) )
  }
  TransformOutput( input: string ): string { return input }
}
