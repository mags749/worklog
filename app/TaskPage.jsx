import React from 'react'
import TaskForm from './TaskForm.jsx'
import TaskList from './TaskList.jsx'

class TaskPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12" style={{ textAlign: 'center' }}>
                        <h1>{this.props.name}</h1>
                    </div>
                </div>
                <br/>
                <TaskForm forName={this.props.name} />
                <br />
                <TaskList items={this.props.items} name={this.props.name} />
            </div>
        )
    }
}

export default TaskPage