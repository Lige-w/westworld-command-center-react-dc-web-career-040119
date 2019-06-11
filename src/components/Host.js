import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {
  return(
    <Card
      className={props.selectedHostId === props.hostId ? 'host selected' : 'host'}
      onClick={(e) => props.selectHost(e, props.hostId)}
      image={props.imageUrl}
      raised
    />
  )
}

export default Host
