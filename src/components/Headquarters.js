import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends Component {
    state = {
    }


    render(){
        return(
            <Grid celled='internally'>
                <Grid.Column width={8}>
                    <ColdStorage
                        hosts={this.props.hosts}
                        selectedHostId={this.props.selectedHost ? this.props.selectedHost.id : null}
                        selectHost={this.props.selectHost}
                    />
                </Grid.Column>
                <Grid.Column width={5}>
                    <Details
                        selectedHost={this.props.selectedHost}
                        areas={this.props.areas}
                        toggleActive={this.props.toggleActive}
                        changeArea={this.props.changeArea}
                        select
                    />
                </Grid.Column>
                <Grid.Column width={3}>
                    <LogPanel
                        toggleAllActive={this.props.toggleAllActive}
                        areAllActive={this.props.areAllActive}
                        logs={this.props.logs}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}

export default Headquarters;
