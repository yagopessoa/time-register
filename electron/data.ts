import { writeFile, readFile } from 'jsonfile';
import * as path from 'path';

import { getDataDir } from './filenames';

export const saveData = async (data: object | any) => {
  const fileName = path.join(getDataDir(), 'data.json');

  await writeFile(fileName, data, { spaces: 2 })
    .then(() => {
      console.log(`${fileName} saved!\n`);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getData = () => {
  const fileName = path.join(getDataDir(), 'data.json');
  return readFile(fileName);
};
