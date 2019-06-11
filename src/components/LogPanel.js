import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import Log from '../services/Log'

const LogPanel = (props) => {

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {props.logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>
      
      {/* Button below is the Activate All/Decommisssion All button */}
      <Button
        fluid
        color={props.areAllActive ? "green" : "red"}
         // This isn't always going to be the same color...
        content={props.areAllActive ? "DECOMISSION ALL" : "ACTIVATE ALL"}
         // Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"?
        onClick={() => props.toggleAllActive(props.areAllActive)}
      />
    </Segment>
  )
}

export default LogPanel
