import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = ({selectedHost, areas, toggleActive, changeArea}) => {
  const renderSomething = () => (<Image size='medium' src={Images.westworldLogo}/>)
  return(
    <Segment id="details" className="HQComps">
      {selectedHost ?
          <HostInfo
              selectedHost={selectedHost}
              areas={areas}
              toggleActive={toggleActive}
              changeArea={changeArea}
          /> :
          renderSomething()}
    </Segment>
  )
}

export default Details
