import React from 'react'
import { addTodo } from './actions/actions'
import store from './actions/store'

class TaskForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onTitleChanged = this.onTitleChanged.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
    store.dispatch(addTodo(this.state.title, this.props.forName))
    this.setState({
      title: ''
    })
  }

  onTitleChanged(e) {
    let message = e.target.value
    this.setState({
      title: message
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Work...." onChange={this.onTitleChanged} value={this.state.title} />
          <span className="input-group-btn">
            <button className="btn btn-info" type="submit">Add!</button>
          </span>
        </div>
      </form>
    )
  }
}

export default TaskForm