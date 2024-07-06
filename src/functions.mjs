import screenshot from 'screenshot-desktop';
import { ImgurClient } from 'imgur';
import { globalShortcut, shell, clipboard, dialog, app } from 'electron';
import path from 'path';
const imgur = new ImgurClient({ clientId: null, undefined, false, 0 });
const Path = app.getAppPath();
function takeScreenshot() {
  globalShortcut.register('PrintScreen', () => {
    screenshot().then(async (i) => {
      const response = await imgur.upload({ image: i, title: 'Uploaded by AutoImgurUploader' });
      dialog.showMessageBox({
        icon: path.join(Path, 'assets', 'icon.ico'),
        type: 'info',
        title: 'ImgurUploader',
        message: 'Image uploaded successfully!',
        buttons: [],
        noLink: true,
      })
      shell.openExternal(response.data.link);
      clipboard.writeText(response.data.link);
    })
  });
}
function winTray(mainWindow, app, Tray, Menu) {
  const tray = new Tray(path.join(Path, 'assets', 'imgu.png'));
  const contextMenu = Menu.buildFromTemplate([{
    label: 'How to use',
    click: () => { mainWindow.show() }
  },
  {
    label: 'Quit',
    click: () => {
      quit();
    }
  }
  ]);
  tray.setContextMenu(contextMenu);

  function quit() {
    tray.destroy();
    app.quit();
    app.exit();
    process.exit();
  }
  // LMAOO

  tray.on('right-click', () => {
    contextMenu.emit();
  });
  tray.on('double-click', () => {
    mainWindow.show();
  });
  tray.on('click', () => {
    contextMenu.emit();
  });
}
export { takeScreenshot, winTray, Path };
