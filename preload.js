const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  getPrinters: (printers) => ipcRenderer.on("getPrinters", printers),
  print: (options) => ipcRenderer.invoke("print", options),
  printSilently: (options) => ipcRenderer.invoke("printSilently", options),
});
