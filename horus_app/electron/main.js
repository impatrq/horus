const { app, BrowserWindow, screen: electronScreen } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: true,
    backgroundColor: "white",
    icon: path.join(__dirname, '../frontend/public/Ojo-de-Horus.ico'),
    webPreferences: {
      nodeIntegration: false,
      devTools: isDev,
    },
  });
  
  const startURL = isDev
    ? "http://localhost:8080"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});