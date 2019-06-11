import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import Fetch from './helpers/Fetch'
import Name from './helpers/Name'
import Log from './services/Log'
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'


class App extends Component {

    state = {
        areas: [],
        hosts: [],
        logs: []
    }

    componentDidMount() {
        Fetch.areas()
            .then(areas => {
                this.setState({areas: areas})
            })

        Fetch.hosts()
            .then(hosts => {
                this.setState({hosts: hosts})
            })
    }

    updateHost = updatedHost => {
        const i = this.state.hosts.findIndex(host => updatedHost.id === host.id)
        const hostsCopy = [...this.state.hosts]
        hostsCopy.splice(i, 1, updatedHost)
        this.setState({hosts: hostsCopy})
    }

    selectHost = (e, hostId) => {
        this.setState({
            selectedHost: this.state.hosts.find(host => {
                return host.id === hostId
            })
        })
    }

    toggleActive = () => {
        this.setState(
            {
                selectedHost: {
                    ...this.state.selectedHost,
                    active: !this.state.selectedHost.active
                }
            },
            () => {
                return Fetch.updateHost(this.state.selectedHost)
                    .then(host => {

                        if(host.active) {
                            this.addLogMessage(
                                'warn',
                                `Activated ${host.firstName}`
                            )
                        } else {
                            this.addLogMessage(
                                'notify',
                                `Decommissioned ${host.firstName}`
                            )
                        }

                        this.updateHost(host)
                    })
            }
        )

    }

    changeArea = (areaName) => {
        const areaObj = this.state.areas.find(area => area.name === areaName)

        const hostsInArea = this.state.hosts.filter(host => host.area === areaName)
        if(hostsInArea.length >= areaObj.limit) {
            this.addLogMessage(
                'error',
                `Too Many hosts. Cannot add ${this.state.selectedHost.firstName} to ${Name.titleizeArea(areaName)}`
            )
            return
        }

        this.setState({
                selectedHost: {
                    ...this.state.selectedHost,
                    area: areaName
                }
            },
            () => {
                return Fetch.updateHost(this.state.selectedHost)
                    .then(host => {
                        this.addLogMessage(
                            'notify',
                            `${host.firstName} set in area ${Name.titleizeArea(host.area)}`)
                        this.updateHost(host)
                    })
            }
        )
    }

    toggleAllActive = (areAllActive) => {
        const hostsCopy = [...this.state.hosts]

        if(!areAllActive) {
            if (this.state.selectedHost){
                this.setState({selectedHost: {...this.state.selectedHost, active: true}})
            }
            hostsCopy.forEach(host => host.active = true)
            this.addLogMessage('warn', 'Activating all hosts!')
        } else {
            if (this.state.selectedHost) {
                this.setState({selectedHost: {...this.state.selectedHost, active: false}})
            }
            hostsCopy.forEach(host => host.active = false)
            this.addLogMessage('notify', 'Decommisioning all hosts')
        }

            hostsCopy.forEach(host => {
                Fetch.updateHost(host)
                    .then(this.updateHost)
            })
    }

    addLogMessage = (type, message) => {
        const logsCopy = [...this.state.logs]
        switch (type) {
            case 'error':
                logsCopy.unshift(Log.error(message))
                break
            case 'notify':
                logsCopy.unshift(Log.notify(message))
                break
            case 'warn':
                logsCopy.unshift(Log.warn(message))
                break
            default:
                logsCopy.unshift(Log.notify(message))
                break
        }

        this.setState({logs: logsCopy})
    }

    render(){
        return (
            <Segment id='app'>
                <WestworldMap
                    areas={this.state.areas}
                    hosts={this.state.hosts.filter(host => host.active)}
                    selectedHostId={this.state.selectedHost ?
                        this.state.selectedHost.id :
                        null}
                    selectHost={this.selectHost}
                />
                <Headquarters
                    hosts={this.state.hosts.filter(host => !host.active)}
                    areas={this.state.areas}
                    selectedHost={this.state.selectedHost}
                    selectHost={this.selectHost}
                    toggleActive={this.toggleActive}
                    toggleAllActive={this.toggleAllActive}
                    areAllActive={this.state.hosts.every(host => host.active)}
                    changeArea={this.changeArea}
                    logs={this.state.logs}
                />
            </Segment>
        )
    }
}

export default App;
