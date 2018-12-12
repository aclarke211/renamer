const excelToJson = require('convert-excel-to-json');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const s3 = require('./s3-upload');

const renameKeys = (keysMap, obj) => Object
  .keys(obj)
  .reduce((acc, key) => ({
    ...acc,
    ...{
      [keysMap[key] || key]: obj[key],
    },
  }), {});

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function convertExcel(sourceFile) {
  return new Promise((resolve) => {
    const excelSheet = excelToJson({
      sourceFile,
    });
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'gb-config.json'), 'utf-8'));
    const firstKey = Object.keys(excelSheet)[0];
    const headers = excelSheet[firstKey][0];

    headers[getKeyByValue(headers, 'latitude')] = 'lat';
    headers[getKeyByValue(headers, 'longitude')] = 'lng';

    const locations = excelSheet[firstKey].splice(1);

    const remappedLocations = locations
      .map(location => renameKeys(headers, location))
      .map(location => ({
        ...location,
        activeOnMap: JSON.parse((location.activeOnMap || 'true').toLowerCase()),
      }));

    config.lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a');

    resolve({
      map: config,
      locations: remappedLocations,
    });
  });
}

function createJSON(jsonFile, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(jsonFile, JSON.stringify(data), 'utf-8', (writeJSONError) => {
      if (writeJSONError) {
        reject(writeJSONError);
      }

      resolve();
    });
  });
}

function uploadJSON(to, from) {
  return new Promise(resolve => s3.upload(to, from, () => resolve()));
}

function remove(file) {
  return new Promise((resolve, reject) => {
    fs.exists(file, (exists) => {
      if (exists) {
        fs.unlink(file, (err) => {
          if (err) reject(err);
          resolve();
        });
      }
    });
  });
}

module.exports.upload = (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  const filename = 'content';
  let s3Folder = 'suppliers-list/content/';
  const excelFile = path.join(__dirname, 'upload', `${filename}.xlsx`);
  const jsonFile = path.join(__dirname, 'upload', `${filename}.json`);
  const locale = 'gb';

  const uploadedFiled = req.files.file;

  s3Folder += (process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'development') ?
    `uat/${locale}/` :
    `live/${locale}/`;

  return uploadedFiled.mv(excelFile, (err) => {
    if (err) return res.status(500).json(err);

    return convertExcel(excelFile)
      .then(data => createJSON(jsonFile, data))
      .then(() => remove(excelFile))
      .then(() => uploadJSON(s3Folder, path.join(__dirname, 'upload')))
      .then(() => remove(jsonFile))
      .then(() => res.json('success...'))
      .catch((promiseError) => {
        res.status(500).json({
          message: promiseError.message,
          stack: promiseError.stack,
        });
      });
  });
};
