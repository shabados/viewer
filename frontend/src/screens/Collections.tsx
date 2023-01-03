import { ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AsciiGurmukhi from '../components/AsciiGurmukhi'
import Content from '../components/Content'
import Row from '../components/Row'
import Section from '../components/Section'
import { SOURCES_API } from '../lib/consts'
import { SourcesResponse } from '../types/api'

type CollectionsProps = {
  setVisibleCollections: Dispatch<SetStateAction<boolean>>,
}

const Collections = ( { setVisibleCollections }: CollectionsProps ) => {
  const [ sources, setSources ] = useState<SourcesResponse>( [] )

  useEffect( () => {
    fetch( SOURCES_API )
      .then( ( res ) => res.json() )
      .then( setSources )
      .catch( ( err: Error ) => console.error( 'Error fetching Sources', err ) )
  }, [] )

  const orderId = { 1: 0, 2: 1, 11: 3, 3: 4, 4: 5, 7: 6, 6: 7, 5: 8, 8: 9, 9: 10, 10: 11 }

  const navigate = useNavigate()

  const handleOnClick = ( link: string ) => {
    navigate( link )
    setVisibleCollections( false )
  }

  return (
    <Content>
      <Section>
        <h1>Collections</h1>

        {sources
          .sort( ( a, b ) => orderId[ a.id ] - orderId[ b.id ] )
          .map( ( { id, nameGurmukhi } ) => (
            <Row
              key={id}
              onClick={() => handleOnClick( `/sources/${id}/page/1/line/0` )}
            >
              <AsciiGurmukhi text={nameGurmukhi} />
              <ChevronRight />
            </Row>
          ) )}
      </Section>
    </Content>
  )
}

export default Collections
