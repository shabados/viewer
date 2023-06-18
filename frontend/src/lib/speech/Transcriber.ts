import { stripEndings, stripVishraams, toHindi, toUnicode } from 'gurmukhi-utils'

export type ResultCallback = ( result: string ) => void

export abstract class Transcriber {
  protected m_callback: ResultCallback

  constructor( callback: ResultCallback ) {
    this.m_callback = callback
  }

  abstract StartRecording() : void
  abstract StopRecording() : void

  TransformInput( input: string ): string {
    return toHindi( stripEndings( stripVishraams( toUnicode( input ) ) ) )
  }
  TransformOutput( input: string ): string { return input }
}
