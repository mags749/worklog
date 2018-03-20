"use strict";

/**
 * Command's for build app
 * electron-packager . --icon=../img/wl.ico --overwrite
 * node executor
*/

var electronInstaller = require('electron-winstaller');
var path = require('path');

var resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: path.join(__dirname, 'build', 'worklog-win32-x64'),
    authors: 'Y-aXis',
    noMsi: true,
    outputDirectory: path.join(__dirname, 'worklog-installer'),
    exe: 'worklog.exe',
    setupExe: 'worklog.exe',    
    loadingGif: path.join(__dirname, 'img', 'loading.gif'),
    iconUrl: path.join(__dirname, 'img', 'wl.ico'),
    owners: 'Y-aXis'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));