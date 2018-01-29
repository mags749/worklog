import { createStore } from 'redux'
import worklogReducer from './reducers'
import { initiateWorkLog } from './worklogdb'

var defaultState = initiateWorkLog()

var store = createStore(worklogReducer, defaultState)

export default store