import React from 'react'
import WorkLog from './WorkLog';
import store from './actions/store';
import { updTaskName, removeTask } from './actions/actions'

class WorkLogItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updatedName: '',
            showNameField: false
        }
        this.showUpdateField = this.showUpdateField.bind(this)
        this.changeName = this.changeName.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    showUpdateField() {
        this.setState({
            showNameField: !this.state.showNameField,
            updatedName: this.props.name.trim()
        })
    }

    changeName(e) {
        this.setState({
            updatedName: e.target.value
        })
    }

    updateName() {
        if(this.state.updatedName.trim() != '' && this.state.updatedName.trim().toLowerCase() != this.props.name.toLowerCase()) {
            store.dispatch(updTaskName(this.props.index, this.state.updatedName))
            this.setState({
                updatedName: '',
                showNameField: false
            })
        }
    }

    removeItem(index) {
        store.dispatch(removeTask(index))
    }

    render() {
        let nameSection = ''

        if(this.state.showNameField) {
            nameSection = <div className="row detail-sec" style={{ paddingTop: '6px'}}>
            <div className="col-sm-10">
                <input type="text" className="form-control" value={this.state.updatedName} onChange={this.changeName} />
            </div>
            <div className="col-sm-2">
                <button className="wl-btn wl-btn-check" onClick={this.updateName}>
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        }

        return (
            <li className="list-group-item flex-column list-group-item-navy">
                <div className="row">
                    <div className="col-sm-10 vr-center">
                        <span className="wl-textwrp">
                            <p className="mb-1">{this.props.name.trim()}</p>
                        </span>
                    </div>
                    <div className="col-sm-2 vr-center">
                        <button className="wl-btn wl-btn-cross" onClick={this.showUpdateField}>
                            <i className="fa fa-pencil wl-btn-l" aria-hidden="true"></i>
                        </button>
                        <button className="wl-btn wl-btn-cross" onClick={this.removeItem.bind(this, this.props.index)}>
                            <i className="fa fa-times-circle wl-btn-l" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                {nameSection}
            </li>
        )
    }
}

export default WorkLogItem