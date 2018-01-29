import { combineReducers } from 'redux'
import {
    ADD_TODO,
    TOGGLE_TODO,
    UPD_TODO_TITLE,
    SET_PRIORITY,
    REMOVE_TODO,
    ADD_TASK,
    GET_TASK,
    SELECT_TASK,
    REMOVE_TASK,
    UPD_TASK_NAME
} from './actions'
import { findWorkLog, saveWorkLog } from './worklogdb'

function tasks(state = [], action) {
    switch (action.type) {
        case GET_TASK:
            return Object.assign([], findWorkLog())
        case ADD_TASK:
            let filterState = state.filter((entry) => {
                return entry.name.toLowerCase() == action.task.toLowerCase()
            })
            if (filterState.length == 0) {
                if (state && state.length > 0) {
                    state.forEach((stt, index) => {
                        stt.isSelected = false
                    })
                }
                let newState = [
                    ...state,
                    {
                        name: action.task,
                        isSelected: true,
                        items: []
                    }
                ]
                saveWorkLog(newState)
                return Object.assign([], newState)
            }
            else
                return state;
        case SELECT_TASK:
            if (state && state.length > 0)
                state.forEach((stt, index) => {
                    if (stt.name == action.task)
                        stt.isSelected = true
                    else
                        stt.isSelected = false
                })
            saveWorkLog(state)
            return Object.assign([], state)
        case REMOVE_TASK:
            if (state[action.index].isSelected && state.length > 1) {
                for (let i in state) {
                    if (i != action.index) {
                        state[i].isSelected = true
                        break
                    }
                }
            }
            state.splice(action.index, 1)
            saveWorkLog(state)
            return Object.assign([], state)
        case UPD_TASK_NAME:
            var newList = state.filter((stt) => {
                return stt.name.toLowerCase() == action.name.toLowerCase()
            })
            if (newList.length == 0) {
                if (state && state.length > 0)
                    state.forEach((stt, index) => {
                        if (index == action.index) {
                            stt.name = action.name
                        }
                    })
                saveWorkLog(state)
            }
            return Object.assign([], state)
        case ADD_TODO:
            let titleUpdated = false
            if (state && state.length > 0)
                state.forEach((stt, index) => {
                    if (stt.name == action.forName) {
                        let filterTitle = stt.items.filter((entry) => {
                            return entry.title.toLowerCase() == action.title.toLowerCase()
                        })
                        if (filterTitle.length == 0) {
                            titleUpdated = true
                            stt.items = [
                                ...stt.items,
                                {
                                    title: action.title,
                                    completed: false,
                                    priority: 'NN',
                                    todoAdded: new Date()
                                }
                            ]
                        }
                    }
                })
            if (titleUpdated) {
                saveWorkLog(state)
                return Object.assign([], state)
            } else
                return state
        case TOGGLE_TODO:
            if (state && state.length > 0)
                state.forEach((stt, index) => {
                    if (stt.name == action.forName) {
                        stt.items.map((todo, index2) => {
                            if (index2 == action.index) {
                                todo.completed = !todo.completed
                                if (todo.completed)
                                    todo.todoCompleted = new Date()
                                else
                                    todo.todoChanged = new Date()
                                return Object.assign({}, todo)
                            } else
                                return todo
                        })
                    }
                })
            saveWorkLog(state)
            return Object.assign([], state)
        case SET_PRIORITY:
            if (state && state.length > 0)
                state.forEach((stt, index) => {
                    if (stt.name == action.forName) {
                        stt.items.map((todo, index2) => {
                            if (index2 == action.index) {
                                todo.priority = action.priority
                                todo.todoChanged = new Date()
                                return Object.assign({}, todo)
                            } else
                                return todo
                        })
                    }
                })
            saveWorkLog(state)
            return Object.assign([], state)
        case UPD_TODO_TITLE:
            if (state && state.length > 0)
                state.forEach((stt, index) => {
                    if (stt.name == action.forName) {
                        var newList = stt.items.filter((todo) => {
                            return todo.title.toLowerCase() == action.title.toLowerCase()
                        })
                        if (newList.length == 0) {
                            stt.items.map((todo, index2) => {
                                if (index2 == action.index) {
                                    todo.title = action.title
                                    todo.todoChanged = new Date()
                                    return Object.assign({}, todo)
                                } else
                                    return todo
                            })
                        }
                    }
                })
            saveWorkLog(state)
            return Object.assign([], state)
        case REMOVE_TODO:
            if (state && state.length > 0)
                state.forEach((stt, index) => {
                    if (stt.name == action.forName) {
                        stt.items.splice(action.index, 1)
                    }
                })
            saveWorkLog(state)
            return Object.assign([], state)

        default:
            return state
    }
}

const worklogReducer = combineReducers({
    tasks
})

export default worklogReducer