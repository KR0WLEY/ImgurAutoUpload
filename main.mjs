import { app, BrowserWindow, Tray, Menu } from 'electron';
import { takeScreenshot, winTray } from './src/functions.mjs';
global.mainWindow = null;
function createWindow () {
    mainWindow = new BrowserWindow({
        width: 465,
        height: 168,
        backgroundColor: '#333333',
        icon: './assets/imgu.png',
        fullscreenable: false,
        resizable: false,
        autoHideMenuBar: true,
        frame: true,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: false,
            devTools: false
        }
    });
    takeScreenshot();
    mainWindow.loadFile('./src/index.html');
    mainWindow.on('minimize', () => { mainWindow.hide(); winTray(mainWindow, app, Tray, Menu) });
    mainWindow.on('close', (e) => { e.preventDefault(); mainWindow.hide() });
}
app.whenReady().then(() => {
    createWindow();
    mainWindow.hide();
    winTray(mainWindow, app, Tray, Menu);
})
