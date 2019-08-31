// Modules to control application life and create native browser window
const {app, Tray ,Menu,BrowserWindow} = require('electron')
const path = require('path')
const electron = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray = null;
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Copy History',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: true
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  const {x,y} = getWindowPosition();
  mainWindow.setPosition(x,y);
  tray = new Tray('./icon/icon.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Maximize', 
      type: 'radio' ,
      click: ()=>{
        mainWindow.show();
      }
     
    },
    {
      label: 'Minimize', 
      type: 'radio' ,
      click: ()=>{
        mainWindow.hide();
      }
    }
  ]);
  tray.setToolTip('This is my application.');
  

  tray.setContextMenu(contextMenu);

  getWindowPosition()

  //when main window show
  mainWindow.on('show', () => {
    console.log('hello');
    //mainWindow.setPosition(bounds.x,bounds.y);
  });
  //mainWindow.on('hide', () => {
  //  tray.setHighlightMode('never');
  //});

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function getWindowPosition(){
  const windowBounds = mainWindow.getBounds();
  const Screen = electron.screen;
  const screenSize = Screen.getDisplayNearestPoint(Screen.getCursorScreenPoint()).workArea;
  let x = Math.floor(screenSize.x + ((screenSize.width / 2) - (windowBounds.width / 2)));
  let y = Math.floor(((screenSize.height + screenSize.y) / 2) - (windowBounds.height / 2));
  return {x,y};
};
