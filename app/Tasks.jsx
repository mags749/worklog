import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import store from './actions/store'
import { getTask, selectTask } from './actions/actions'
import WorkLog from './WorkLog.jsx'
import TaskPage from './TaskPage.jsx'

class Tasks extends React.Component {
    constructor() {
        super()
        store.dispatch(getTask())
        let state = store.getState()
        let tasksItems = state.tasks.slice()
        this.state = {
            tasks: Object.assign([], tasksItems),
            addPage: false
        }
        this.showAddDialog = this.showAddDialog.bind(this)
    }

    componentWillMount() {
        store.subscribe(() => {
            let state = store.getState()
            let tasksItems = state.tasks.slice()
            this.setState({
                tasks: Object.assign([], tasksItems)                
            })
        })
    }

    selectCurrentItem(name) {
        store.dispatch(selectTask(name))
    }

    showAddDialog() {
        this.setState({
            addPage: true
        });
    }

    shouldComponentUpdate() {
        return true
    }

    render() {
        let tasks = []

        let selectedItem = {}

        this.state.tasks.forEach((item, index) => {
            tasks.push(
                <li key={index} className={item.isSelected ? "active" : ""} onClick={this.selectCurrentItem.bind(this, item.name)}>
                    <a href='#'>
                        {item.name}
                    </a>
                </li>
            )
            if (item.isSelected)
                selectedItem = item
        })

        if (!tasks.length) {
            return (
                <Redirect to="/worklog" from="/task" push={true} />
            )
        }

        return (
            <div>                
                <br />
                <div className="row">
                    <div className="col col-sm-11">
                        <ul className='nav nav-tabs'>
                            {tasks}
                        </ul>
                    </div>
                    <div className="col col-sm-1">
                        <Link to="/worklog" >
                            <button onClick={this.showAddDialog} className="wl-btn wl-btn-xl">
                                <i className="fa fa-tasks"></i>
                            </button>
                        </Link>
                    </div>
                </div>
                <TaskPage name={selectedItem.name} items={selectedItem.items} />
            </div>
        )
    }
}

export default Tasks