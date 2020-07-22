import { writeFile, readFile } from 'jsonfile';

export const saveData = async (data: object | any) => {
  const fileName = __dirname + '/data/data.json';

  await writeFile(fileName, data, { spaces: 2 })
    .then(() => {
      console.log(`${fileName} saved!\n`);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getData = () => {
  const fileName = __dirname + '/data/data.json';
  return readFile(fileName);
};
