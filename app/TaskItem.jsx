import React from 'react'
import dateFormat from 'dateformat';
import { toggleTodo, setPriority, updTodoTitle, removeTodo } from './actions/actions'
import store from './actions/store'

class TaskItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetails: false,
            showPriority: false,
            showEdits: false,
            updatedTitle: ''
        }
        this.onToggleClick = this.onToggleClick.bind(this)
        this.onRemoveClick = this.onRemoveClick.bind(this)
        this.showDetails = this.showDetails.bind(this)
        this.showEdits = this.showEdits.bind(this)
        this.changePriority = this.changePriority.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.updateTitle = this.updateTitle.bind(this)
    }

    onToggleClick() {
        store.dispatch(toggleTodo(this.props.index, this.props.forName))
    }

    onRemoveClick() {
        store.dispatch(removeTodo(this.props.index, this.props.forName))
    }

    showDetails() {
        this.setState({
            showDetails: !this.state.showDetails,
            showPriority: false,
            showEdits: false
        })
    }

    changePriority() {
        this.setState({
            showDetails: false,
            showPriority: !this.state.showPriority,
            showEdits: false
        })
    }

    showEdits() {
        this.setState({
            showDetails: false,
            showPriority: false,
            showEdits: !this.state.showEdits,
            updatedTitle: this.props.item.title.trim()
        })
    }

    setFlag(priority) {
        store.dispatch(setPriority(this.props.index, priority, this.props.forName))
        this.setState({
            showPriority: false
        })
    }

    changeTitle(e) {
        this.setState({
            updatedTitle: e.target.value.trim()
        })
    }

    updateTitle() {
        if(this.state.updatedTitle.trim() != '' && this.props.item.title.trim().toLowerCase() != this.state.updatedTitle.toLowerCase()) {
            store.dispatch(updTodoTitle(this.props.index, this.state.updatedTitle, this.props.forName))
            this.setState({
                updatedTitle: '',
                showEdits: false
            })
        }
    }

    render() {
        let detailsSection = ''
        let updateSection = ''
        let changedSection = ''
        let flagIcon = ''
        let formatDate = 'ddd, dd-mm-yyyy hh:MM:ss TT'

        if (this.props.item.completed) {
            updateSection = <span>
                Completed on: {dateFormat(this.props.item.todoCompleted, formatDate)}
            </span>
        } else {
            updateSection = <span>
                Added on: {dateFormat(this.props.item.todoAdded, formatDate)}
            </span>
        }

        if (!this.props.item.completed && this.props.item.todoChanged) {
            changedSection = <div className="col-sm-6 center-lbl">
                <span>
                    Last updated on: {dateFormat(this.props.item.todoChanged, formatDate)}
                </span>
            </div>
        }

        if (this.state.showDetails) {
            detailsSection = <div className="row detail-sec">
                <div className="col-sm-6 center-lbl">
                    {updateSection}
                </div>
                {changedSection}
            </div>
        }

        if (this.state.showPriority) {
            detailsSection = <div className="row detail-sec">
                <div className="col-sm-2">
                    Priority:
                </div>
                <div className="col-sm-10">
                    <div className="row">
                        <div className="col-sm-3">
                            <button className="wl-btn" onClick={this.setFlag.bind(this, 'NN')}>
                                <i className="fa fa-circle" aria-hidden="true"></i>
                                &nbsp;None
                            </button>
                        </div>
                        <div className="col-sm-3">
                            <button className="wl-btn" onClick={this.setFlag.bind(this, 'LP')}>
                                <i className="fa fa-flag-o" aria-hidden="true"></i>
                                &nbsp;Low
                            </button>
                        </div>
                        <div className="col-sm-3">
                            <button className="wl-btn" onClick={this.setFlag.bind(this, 'MP')}>
                                <i className="fa fa-flag-checkered" aria-hidden="true"></i>
                                &nbsp;Medium
                            </button>
                        </div>
                        <div className="col-sm-3">
                            <button className="wl-btn" onClick={this.setFlag.bind(this, 'HP')}>
                                <i className="fa fa-flag" aria-hidden="true"></i>
                                &nbsp;High
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }

        if (this.state.showEdits) {
            detailsSection = <div className="row detail-sec" style={{ paddingTop: '6px'}}>
                <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.updatedTitle} onChange={this.changeTitle} />
                </div>
                <div className="col-sm-2">
                    <button className="wl-btn wl-btn-check" onClick={this.updateTitle}>
                        <i className="fa fa-check-square" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        }

        if (this.props.item.priority == 'LP') {
            flagIcon = <i className="fa fa-flag-o" aria-hidden="true"></i>
        } else if (this.props.item.priority == 'MP') {
            flagIcon = <i className="fa fa-flag-checkered" aria-hidden="true"></i>
        } else if (this.props.item.priority == 'HP') {
            flagIcon = <i className="fa fa-flag" aria-hidden="true"></i>
        } else {
            flagIcon = <i className="fa fa-circle" aria-hidden="true"></i>
        }

        return (
            <li className={this.props.item.completed ? 'list-group-item flex-column list-group-item-success' : 'list-group-item flex-column list-group-item-info'}>
                <div className="row">
                    <div className="col-sm-1 flex-checkbox">
                        <label className="checkbox wl-checkbox">
                            <input className="lbl-checkbox" type="checkbox" onChange={this.onToggleClick} checked={!!this.props.item.completed} />
                            <span className="lbl-txt">
                                <span className="lbl-check">
                                    <i className="fa fa-check icon"></i>
                                </span>
                            </span>
                        </label>
                    </div>
                    <div className="col-sm-10 vr-center">
                        <span style={{ textDecoration: this.props.item.completed ? 'line-through' : 'none' }} className="wl-textwrp">
                            <p className="mb-1">{this.props.item.title.trim()}</p>
                        </span>
                    </div>
                    <div className="col-sm-1 vr-center" style={{ padding: '0px'}}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <button className="wl-btn" onClick={this.showEdits}>
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="wl-btn" onClick={this.onRemoveClick}>
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button className="wl-btn" onClick={this.changePriority}>
                                            {flagIcon}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="wl-btn" onClick={this.showDetails}>
                                            <i className="fa fa-bars" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {detailsSection}
            </li>
        )
    }
}

export default TaskItem