import React from 'react'
import store from './actions/store'
import TaskItem from './TaskItem.jsx'

class TaskList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.items.length) {
      return (
        <p>
          <i>Please add some Work details</i>
        </p>
      )
    }

    let items = []
    let lowPriorityItems = []
    let mediumPriorityItems = []
    let highPriorityItems = []
    let priorityPresent = false

    this.props.items.forEach((item, index) => {
      let taskItem = <TaskItem key={index} index={index} item={item} forName={this.props.name} />
      if (item.priority == 'LP') {
        lowPriorityItems.push(taskItem)
        priorityPresent = true
      } else if (item.priority == 'MP') {
        mediumPriorityItems.push(taskItem)
        priorityPresent = true
      } else if (item.priority == 'HP') {
        highPriorityItems.push(taskItem)
        priorityPresent = true
      } else {
        items.push(taskItem)
      }
    })

    let nnSection = ''
    let nnDisplay = priorityPresent ? 'Items with No Priority' : 'Complete List'
    if (items.length > 0) {
      nnSection = <div className="row">
        <div className="col-sm-12" style={{ flexDirection: 'column' }}>
          <span className="list-name">{nnDisplay}</span>
          <ul className='list-group'>{items}</ul>
        </div>
      </div>
    }

    let lpSection = ''
    if (lowPriorityItems.length > 0) {
      lpSection = <div className="row">
        <div className="col-sm-12" style={{ flexDirection: 'column' }}>
          <span className="list-name">Low Priority</span>
          <ul className='list-group'>{lowPriorityItems}</ul>
        </div>
      </div>
    }

    let mpSection = ''
    if (mediumPriorityItems.length > 0) {
      mpSection = <div className="row">
        <div className="col-sm-12" style={{ flexDirection: 'column' }}>
          <span className="list-name">Medium Priority</span>
          <ul className='list-group'>{mediumPriorityItems}</ul>
        </div>
      </div>
    }

    let hpSection = ''
    if (highPriorityItems.length > 0) {
      hpSection = <div className="row">
        <div className="col-sm-12" style={{ flexDirection: 'column' }}>
          <span className="list-name">High Priority</span>
          <ul className='list-group'>{highPriorityItems}</ul>
        </div>
      </div>
    }

    return (
      <div className="task-list">
        {hpSection}
        {mpSection}
        {lpSection}
        {nnSection}
      </div>
    )
  }
}

export default TaskList