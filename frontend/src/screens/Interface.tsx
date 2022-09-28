import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import Content from '../components/Content'
import Section from '../components/Section'
import Slider from '../components/Slider'

export const zoom = atomWithStorage( 'zoom', 1 )

const Interface = () => {
  const [ valueZoom, setValueZoom ] = useAtom( zoom )
  return (
    <Content>
      <Section>
        <h2>Zoom</h2>
        <Slider min={1} max={4} step={0.1} units="x" value={valueZoom} setValue={setValueZoom} />
      </Section>
    </Content>
  )
}

export default Interface
