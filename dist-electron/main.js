import { app, BrowserWindow, Tray, Menu } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
const require2 = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let settingsWindow;
let desktopWidgetWindow;
let tray;
function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }
  settingsWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  if (VITE_DEV_SERVER_URL) {
    settingsWindow.loadURL(`${VITE_DEV_SERVER_URL}/settings`);
  } else {
    settingsWindow.loadFile(path.join(RENDERER_DIST, "settings.html"));
  }
  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}
function createDesktopWidgetWindow() {
  const { width, height } = require2("electron").screen.getPrimaryDisplay().workAreaSize;
  desktopWidgetWindow = new BrowserWindow({
    width,
    height,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    alwaysOnTop: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  desktopWidgetWindow.setIgnoreMouseEvents(true, { forward: true });
  if (VITE_DEV_SERVER_URL) {
    desktopWidgetWindow.loadURL(`${VITE_DEV_SERVER_URL}/desktop-widget`);
  } else {
    desktopWidgetWindow.loadFile(path.join(RENDERER_DIST, "desktop-widget.html"));
  }
}
function createTray() {
  tray = new Tray(path.join(process.env.VITE_PUBLIC, "logo.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "打开设置", click: createSettingsWindow },
    { label: "退出程序", click: () => app.quit() }
  ]);
  tray.setToolTip("瑞思课堂工具");
  tray.setContextMenu(contextMenu);
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    settingsWindow = null;
    desktopWidgetWindow = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createDesktopWidgetWindow();
  }
});
app.whenReady().then(() => {
  createDesktopWidgetWindow();
  createTray();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
