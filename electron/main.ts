import { app, BrowserWindow, ipcMain } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import * as url from 'url';
import 'regenerator-runtime/runtime.js';

import { saveData, getData } from './data';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 440,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'Registro de Ponto',
    resizable: false,
    autoHideMenuBar: true,
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app
  .on('ready', () => {
    const DATA_DIR = __dirname + '/data/';

    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR);
    }

    createWindow();
  })
  .whenReady()
  .then(() => {});

app.allowRendererProcessReuse = true;

ipcMain.on('save-data', (_, data) => {
  console.log(`[SAVING]:\n`, data, '\n');
  saveData(data);
});

ipcMain.on('request-data', (event) => {
  console.log('[GETTING DATA]\n');
  getData()
    .then((data: any) => {
      console.log(`[SENDING]:\n`, data, '\n');
      event.reply('return-data', data);
    })
    .catch((err: any) => {
      console.log(err);
      event.reply('return-data', undefined);
    });
});
