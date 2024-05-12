const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  await win.loadFile("index.html");

  const printers = await win.webContents.getPrintersAsync();

  console.log(printers);

  win.webContents.send("getPrinters", printers);
  win.webContents.openDevTools();
};

const printWithDialog = (_, options) => {
  let win = BrowserWindow.getFocusedWindow();
  // let win = BrowserWindow.getAllWindows()[0];

  win.webContents.print(options, (success, failureReason) => {
    if (!success) console.log(failureReason);

    console.log("Print Initiated");
  });
};

const printWithoutDialog = (_, options) => {
  let win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("https://www.google.com/");

  win.webContents.on("did-finish-load", async () => {
    win.webContents.print(options, (success, failureReason) => {
      if (!success) console.log(failureReason);
      console.log("Print Initiated");
    });
  });
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  ipcMain.handle("print", printWithDialog);
  ipcMain.handle("printSilently", printWithoutDialog);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
