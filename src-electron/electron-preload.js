/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 **/
import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('db', {
  setupCheck: async() => ipcRenderer.invoke('setupCheck'),
  getAll: async(table) =>ipcRenderer.invoke('getAll', table),
  getById: async(table, id) =>ipcRenderer.invoke('getById', table, id),
  get: async (table, where, returnFields, orderBy) => ipcRenderer.invoke('get', table, where, returnFields, orderBy),
  post: async (table, data) => ipcRenderer.invoke('post', table, data),
  put: async (table, data) => ipcRenderer.invoke('put', table, data),
  delete: async (table, data) => ipcRenderer.invoke('delete', table, data),
  router: async(table, method, args) => ipcRenderer.invoke('router', table, method, args)
});

/** WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.js you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
