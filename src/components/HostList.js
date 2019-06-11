import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {

  const hostElements = props.hosts.map(host => {
    return <Host
        key={host.id}
        selectedHostId={props.selectedHostId}
        hostId={host.id}
        imageUrl={host.imageUrl}
        selectHost={props.selectHost}
    />
  })

  return(
    <Card.Group itemsPerRow={6}>
      {hostElements}
    </Card.Group>
  )
}

export default HostList
