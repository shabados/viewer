import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import screenfull from 'screenfull'

import Content from '../components/Content'
import Row from '../components/Row'
import Section from '../components/Section'
import Separator from '../components/Separator'
import Slider from '../components/Slider'

export const zoom = atomWithStorage( 'zoom', 1 )
export const fullscreen = atom( false )

const Interface = () => {
  const [ valueZoom, setValueZoom ] = useAtom( zoom )
  const [ valueFullscreen, setValueFullscreen ] = useAtom( fullscreen )

  if ( screenfull.isEnabled ) {
    screenfull.on( 'change', () => {
      setValueFullscreen( !!screenfull.isFullscreen )
    } )
  }

  const toggleFullScreen = () => {
    if ( screenfull.isEnabled ) {
      screenfull.toggle().catch( ( err: Error ) => console.error( 'Error fetching Sources', err ) )
    }
  }

  return (
    <Content>
      <Section>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <p>Zoom</p>
          <Slider min={1} max={4} step={0.1} units="x" value={valueZoom} setValue={setValueZoom} />
        </div>
        <Separator />
        <Row onClick={toggleFullScreen}>
          <p>Full screen</p>
          <input type="checkbox" checked={!!valueFullscreen} />
        </Row>
      </Section>
    </Content>
  )
}

export default Interface
