
const {app, BrowserWindow, ipcMain} = require('electron')


let mainWindow

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 590,
    height: 405, 
    transparent: true,
    frame:false
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('closed', () => app.quit())
}

exports.openWindow = (filename) => {
  let win = new BrowserWindow({width: 500, height: 600, transparent: true,frame:false})
  win.loadURL(`file://${__dirname}/` + filename + `.html`)
}

// //Register event listener
// ipcMain.on('asynchronous-message', function(event, arg) {
//   console.log('Asinchronous message sent!');
//   event.sender.send('asynchronous-reply', 'pong');
// });