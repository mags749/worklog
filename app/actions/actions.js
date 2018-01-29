
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const UPD_TODO_TITLE = 'UPD_TODO_TITLE'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_PRIORITY = 'SET_PRIORITY'
export const ADD_TASK = 'ADD_TASK'
export const GET_TASK = 'GET_TASK'
export const SELECT_TASK = 'SELECT_TASK'
export const UPD_TASK_NAME = 'UPD_TASK_NAME'
export const REMOVE_TASK = 'REMOVE_TASK'

export function addTodo(title, forName) {
    return {
        type: ADD_TODO,
        title,
        forName
    }
}

export function toggleTodo(index, forName) {
    return {
        type: TOGGLE_TODO,
        index,
        forName
    }
}

export function setPriority(index, priority, forName) {
    return {
        type: SET_PRIORITY,
        index,
        priority,
        forName
    }
}

export function updTodoTitle(index, title, forName) {
    return {
        type: UPD_TODO_TITLE,
        index,
        title,
        forName
    }
}

export function removeTodo(index, forName) {
    return {
        type: REMOVE_TODO,
        index,
        forName
    }
}

export function addTask(task) {
    return {
        type: ADD_TASK,
        task
    }
}

export function removeTask(index) {
    return {
        type: REMOVE_TASK,
        index
    }
}

export function getTask() {
    return {
        type: GET_TASK
    }
}

export function selectTask(task) {
    return {
        type: SELECT_TASK,
        task
    }
}

export function updTaskName(index, name) {
    return {
        type: UPD_TASK_NAME,
        index,
        name
    }
}