const path = require('path');
const fs = require('fs').promises;

const getData = async (fileName) => {
  console.log(fileName)
  const content = await fs.readFile(path.resolve(__dirname, '..', `${fileName}.json`), 'utf8');

  return JSON.parse(content);
};

const setData = async (fileName, data) => {
  return fs.writeFile(path.resolve(__dirname, '..', `${fileName}.json`), JSON.stringify(data, null, 2));
}

module.exports = {
  getData,
  setData,
};
