import { app, BrowserWindow, ipcMain } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import * as url from 'url';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'regenerator-runtime/runtime.js';

import { saveData, getData } from './data';
import { IValues, exportExcel } from './sheets';

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
    moment.locale('pt-br');

    const DATA_DIR = __dirname + '/data/';
    const REPORT_DIR = __dirname + '/report/';

    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR);
    }
    if (!existsSync(REPORT_DIR)) {
      mkdirSync(REPORT_DIR);
    }

    createWindow();
  })
  .whenReady()
  .then(() => {});

app.allowRendererProcessReuse = true;

ipcMain.on('save-data', (_, data: IValues) => {
  console.log('[SAVING]\n');
  saveData(data);
});

ipcMain.on('request-data', (event) => {
  console.log('[GETTING DATA]\n');
  getData()
    .then((data: any) => {
      console.log('[SENDING]\n');
      event.reply('return-data', data);
    })
    .catch((err: any) => {
      console.log(err);
      event.reply('return-data', undefined);
    });
});

ipcMain.on('generate-report', (_, data: IValues, month: string) => {
  console.log(`[GENERATING REPORT]: ${month}\n`);
  exportExcel(data, month);
});
