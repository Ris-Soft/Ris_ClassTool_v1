import { app as n, BrowserWindow as l, Tray as f, Menu as u } from "electron";
import { createRequire as w } from "node:module";
import { fileURLToPath as T } from "node:url";
import e from "node:path";
const g = w(import.meta.url), a = e.dirname(T(import.meta.url));
process.env.APP_ROOT = e.join(a, "..");
const i = process.env.VITE_DEV_SERVER_URL, I = e.join(process.env.APP_ROOT, "dist-electron"), c = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? e.join(process.env.APP_ROOT, "public") : c;
let o, t, r;
function p() {
  if (o) {
    o.focus();
    return;
  }
  o = new l({
    height: 600,
    width: 900,
    icon: e.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: e.join(a, "preload.mjs")
    },
    autoHideMenuBar: !0
  }), i ? o.loadURL(`${i}/settings`) : o.loadFile(e.join(c, "settings.html")), o.on("closed", () => {
    o = null;
  });
}
function d() {
  const { width: s, height: m } = g("electron").screen.getPrimaryDisplay().workAreaSize;
  t = new l({
    width: s,
    height: m,
    icon: e.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    frame: !1,
    transparent: !0,
    resizable: !1,
    movable: !1,
    minimizable: !1,
    maximizable: !1,
    closable: !1,
    alwaysOnTop: !1,
    webPreferences: {
      preload: e.join(a, "preload.mjs")
    }
  }), t.setIgnoreMouseEvents(!0, { forward: !0 }), i ? t.loadURL(`${i}/desktop-widget`) : t.loadFile(e.join(c, "desktop-widget.html"));
}
function R() {
  r = new f(e.join(process.env.VITE_PUBLIC, "logo.png"));
  const s = u.buildFromTemplate([
    { label: "打开设置", click: p },
    { label: "退出程序", click: () => n.quit() }
  ]);
  r.setToolTip("瑞思课堂工具"), r.setContextMenu(s), r.on("click", p);
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), o = null, t = null);
});
n.on("activate", () => {
  l.getAllWindows().length === 0 && d();
});
n.whenReady().then(() => {
  d(), R();
});
export {
  I as MAIN_DIST,
  c as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
