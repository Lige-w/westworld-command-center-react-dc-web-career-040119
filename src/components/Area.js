import React from 'react';
import '../stylesheets/Area.css'
import Name from '../helpers/Name'
import HostList from './HostList'

const Area = props => {

  return (
      <div className='area' id={props.name}>
        <h3 className='labels'>{Name.titleizeArea(props.name)}</h3>
          <HostList
              hosts={props.hosts}
              selectHost={props.selectHost}
              selectedHostId={props.selectedHostId}
          />
      </div>
  )
}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
          `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
