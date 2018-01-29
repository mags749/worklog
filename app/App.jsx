import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, browserHistory } from 'react-router-dom'

import Tasks from './Tasks.jsx'
import WorkLog from './WorkLog.jsx'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route path="/task" component={Tasks} />
          <Route path="/worklog" component={WorkLog} />
          <Redirect from="/" to="/task" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App