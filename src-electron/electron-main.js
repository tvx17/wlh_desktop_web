import {app, BrowserWindow, nativeTheme} from 'electron';
import path from 'path';
import os from 'os';
import requests from './requests';

const {ipcMain} = require('electron');

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'));
  }
} catch (_) {
}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
                                   icon          : path.resolve(__dirname, 'icons/icon.png'), // tray icon
                                   width         : 1000,
                                   height        : 600,
                                   useContentSize: true,
                                   webPreferences: {
                                     sandbox         : true,
                                     contextIsolation: true,
                                     // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
                                     preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
                                   }
                                 });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('getAll', async (ipcMainInvokeEvent, table) => {return await requests.getAll(table);});
ipcMain.handle('getById', async (ipcMainInvokeEvent, table, id) => {return await requests.getById(table, id);});
ipcMain.handle('get', async (ipcMainInvokeEvent, table, data) => {
  return await requests.get(table, data);
});
ipcMain.handle('post', async (ipcMainInvokeEvent, table, data) => {
  return await requests.post(table, data);
});
ipcMain.handle('put', async (ipcMainInvokeEvent, table, data) => {
  console.log('DuDu'); return await requests.put(table, data);
});
ipcMain.handle('delete', async (ipcMainInvokeEvent, table, data) => {
  return await requests.delete(table, data);
});
ipcMain.handle('setupCheck', async (ipcMainInvokeEvent, data) => {
  return await requests.setupCheck();
});
ipcMain.handle('router', async (ipcMainInvokeEvent, table, method, args) => {

  return await requests.router(table, method, args);
});


