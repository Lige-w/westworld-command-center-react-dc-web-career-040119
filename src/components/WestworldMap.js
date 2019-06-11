import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = props => {

  const areaElements = props.areas.map(area => <Area
      key={area.id}
      name={area.name}
      limit={area.limit}
      hosts={props.hosts.filter(host => host.area === area.name)}
      selectHost={props.selectHost}
      selectedHostId={props.selectedHostId}
  />)

    return (
        <Segment id="map" >
          {areaElements}
        </Segment>
    )
}

export default WestworldMap
