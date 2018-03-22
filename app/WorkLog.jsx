import React from 'react'
import store from './actions/store'
import { getTask, addTask } from './actions/actions'
import { Redirect } from 'react-router-dom'
import WorkLogItem from './WorkLogItem.jsx'

class WorkLog extends React.Component {
    constructor(props) {
        super(props)
        store.dispatch(getTask())
        let state = store.getState()
        let tasksItems = state.tasks.slice()
        this.state = {
            name: '',
            navigateBack: false,
            tasks: Object.assign([], tasksItems)
        }
        this.addPage = this.addPage.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    componentWillMount() {
        store.subscribe(() => {
            let state = store.getState()
            let tasksItems = state.tasks.slice()
            this.setState({
                tasks: tasksItems
            })
        })
    }

    updateName(e) {
        this.setState({ name: e.target.value })
    }

    addPage(e) {
        e.preventDefault()
        store.dispatch(addTask(this.state.name))
        let state = store.getState()
        let tasksItems = state.tasks.slice()
        this.setState({
            name: '',
            tasks: tasksItems
        })
    }

    navigateToHome() {
        this.setState({ navigateBack: true })
    }

    shouldComponentUpdate() {
        return true
    }

    render() {
        if (this.state.navigateBack) {
            return <Redirect to="/task" push={true} />
        }

        let tasks = []

        let selectedItem = {}

        this.state.tasks.forEach((item, index) => {
            tasks.push(
                <WorkLogItem key={index} index={index} name={item.name} />
            )
        })

        let backButton = ''

        if (this.state.tasks.length > 0) {
            backButton = <button className="wl-btn wl-btn-xl" onClick={this.navigateToHome.bind(this)} style={{ width: '35px'}}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
        }

        return (
            <div id="todoModal">
                <div>
                    <div>
                        <br />
                        <div className="row row-baseline">
                            <div className="col-sm-1 center-lbl">
                                {backButton}
                            </div>
                            <div className="col-sm-10 center-lbl title">
                                <h1 className="modal-name">Create a WorkLog</h1>
                            </div>
                        </div>
                        <br />
                        <div>
                            <form onSubmit={this.addPage} >
                                <div className="row">
                                    <div className="col col-sm-12">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Work log Name" onChange={this.updateName} value={this.state.name} />
                                            <span className="input-group-btn">
                                                <button className="btn btn-info" type="submit">Add Work Log!</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <br />
                        <div className="task-list">
                            <ul className="list-group">
                                {tasks}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WorkLog