const RETRIEVE_DATA_TIMEOUT = 10000;

export function saveData(data: object | any): void {
  const { ipcRenderer } = window.require('electron');
  ipcRenderer.send('save-data', data);
}

export async function readData<T>(): Promise<T> {
  return new Promise(function (resolve, reject) {
    const { ipcRenderer } = window.require('electron');

    const timeout = window.setTimeout(function () {
      resolve(undefined);
    }, RETRIEVE_DATA_TIMEOUT);

    ipcRenderer.on('return-data', (_: any, data: T) => {
      window.clearTimeout(timeout);
      resolve(data);
    });

    ipcRenderer.send('request-data');
  });
}
