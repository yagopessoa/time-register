import os from 'os';
import * as path from 'path';

export function getDataDir() {
  return os.platform() === 'linux'
    ? path.join(os.homedir() + '/Downloads/registro-de-ponto/data')
    : path.join(__dirname, 'data');
}
export function getReportDir() {
  return os.platform() === 'linux'
    ? path.join(os.homedir() + '/Downloads/registro-de-ponto/report')
    : path.join(__dirname, 'report');
}
