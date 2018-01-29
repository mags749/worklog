export function findWorkLog() {
    var retItem = ipcRenderer.sendSync('find-worklogs-request')
    if(typeof(retItem) === 'object')
        return retItem[0].worklog
    else {
        console.error(retItem)
        return {}
    }
}

export function saveWorkLog(worklog) {
    var retItem = ipcRenderer.sendSync('save-worklogs-request', worklog)
    if(retItem.retCode == 200)
        return worklog
    else {
        console.error(retItem)
        return {}
    }
}

export function initiateWorkLog() {
    var retItem = ipcRenderer.sendSync('find-worklogs-request')
    if(retItem.worklog)
        return retItem.worklog
    else {
        var retItem = ipcRenderer.sendSync('initiate-worklogs-request')
        if(retItem.worklog)
            return retItem.worklog
        else {
            console.error(retItem)
            return {}
        }
    }
}