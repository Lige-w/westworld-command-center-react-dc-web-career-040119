import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'
import Name from '../helpers/Name'

class HostInfo extends Component {
  constructor(props) {
    super()

    this.state = {
      options: props.areas.map(area => {
        return {
          key: area.name,
          text: Name.titleizeArea(area.name),
          value: area.name
        }
      }),
      value: props.selectedHost.area,
      // This state is just to show how the dropdown component works.
      // Options have to be formatted in this way (array of objects with keys of: key, text, value)
      // Value has to match the value in the object to render the right text.

      // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
    }
  }





  handleChange = (e, {value}) => {
    this.setState({value: value}, () => this.props.changeArea(value))
  }

  render(){
    const {selectedHost: {firstName, lastName, active, imageUrl, gender, area}, toggleActive} = this.props
    return (
        <Grid>
          <Grid.Column width={6}>
            <Image
                src={imageUrl}
                floated='left'
                size='small'
                className="hostImg"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card>
              <Card.Content>
                <Card.Header>
                  {`${firstName}${lastName !== 'n/a' ? ` ${lastName}` : ''}`} |
                  { gender === 'Male' ?
                      <Icon name='man' /> :
                      <Icon name='woman' />}
                </Card.Header>
                <Card.Meta>
                  <Radio
                      onChange={toggleActive}
                      label={active ? 'Active' : 'Decomissioned'}
                      checked={active}
                      slider
                  />
                </Card.Meta>

                <Divider />
                Current Area:
                <Dropdown
                    onChange={this.handleChange}
                    value={area}
                    options={this.state.options}
                    selection
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
    )
  }
}

export default HostInfo
