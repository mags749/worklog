if(require('electron-squirrel-startup')) 
    return;

const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const Datastore = require('nedb')
const { ipcMain } = require('electron')

let worklogdb = new Datastore({
    filename: __dirname + '/worklog.db',
    autoload: true
})

ipcMain.on('find-worklogs-request', (event) => {
    let query = { _id: 'id1' };
    worklogdb.find(query, (err, docs) => {
        if (err)
            event.returnValue = { retCode: 0 }
        else
            event.returnValue = docs
    })
})

ipcMain.on('save-worklogs-request', (event, worklogIns) => {
    let query = { _id: 'id1' };
    worklogdb.update(query, { $set: { worklog: worklogIns } }, (err, numAffected) => {
        if (err)
            event.returnValue = { retCode: 0 }
        else if (numAffected == 0)
            event.returnValue = { retCode: 1 }
        else
            event.returnValue = { retCode: 200 }
    })
})

ipcMain.on('initiate-worklogs-request', (event) => {
    let worklogIns = {
        _id: 'id1',
        worklog: []
    }
    worklogdb.insert(worklogIns, (err, docs) => {
        if (err)
            event.returnValue = { retCode: 0 }
        else
            event.returnValue = docs
    })
})

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            webSecurity: false
        }
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    //mainWindow.setMenu(null)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit()
})

app.on('activate', function () {
    if (mainWindow == null)
        createWindow()
})