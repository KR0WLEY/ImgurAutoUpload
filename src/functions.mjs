import screenshot from 'screenshot-desktop';
import { ImgurClient } from 'imgur';
import { globalShortcut, shell, clipboard, dialog } from 'electron';
const imgur = new ImgurClient({ clientId: null });
function takeScreenshot() {
  globalShortcut.register('PrintScreen', () => {
    screenshot().then(async (i) => {
      const response = await imgur.upload({ image: i, title: 'Uploaded by AutoImgurUploader' });
      dialog.showMessageBox({
        icon: './assets/imgu.png',
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
  const contextMenu = Menu.buildFromTemplate([{
    label: 'How to use',
    click: () => { mainWindow.show() }
  },
  {
    label: 'Quit',
    click: () => {
      app.quit();
    }
  }
  ]);
  const tray = new Tray('./assets/imgu.png');
  tray.setContextMenu(contextMenu);

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
export { takeScreenshot, winTray };
