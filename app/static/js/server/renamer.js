var fs = require('fs');

module.exports.findFile = (req, res) => {
  let content = req.body;
  console.log('RECEIVED CONTENT:');
  // console.log(content);

  content = checkFilesExist(content);
  res.json(content);
};

function checkFilesExist(content) {

  content.files.forEach((file) => {
    const path = `${file.srcDir}/${file.oldFilename}`;

    if (fs.existsSync(`${path}.${file.fileTypes.mainType}`)) {
      file.foundStatus = true;
      file.fileType = file.fileTypes.mainType;
      console.log(`FILE "${file.oldFilename}.${file.fileType}" FOUND!`);
    } else {
      file.fileTypes.types.forEach(type => {
        if (fs.existsSync(`${path}.${type}`)) {
          file.foundStatus = true;
          file.fileType = type;
          console.log(`FILE "${file.oldFilename}.${file.fileType}" FOUND!`);
        }
      });

      if (!file.foundStatus) {
        console.log(`Cannot find file: "${file.oldFilename}"`);
      }
    }
  });

  // console.log(content);
  return content;
}

module.exports.renameFile = (req, res) => {
  let file = req.body;



  if (!fs.existsSync(`${file.srcDir}/${file.defaultFolder}`)) {
    fs.mkdirSync(`${file.srcDir}/${file.defaultFolder}`);
  }
  if (!fs.existsSync(`${file.srcDir}/${file.folder}`)) {
    fs.mkdirSync(`${file.srcDir}/${file.folder}`);
  }

  console.log('FILE TO RENAME RECEIVED:')
  fs.rename(`${file.srcDir}/${file.oldFilename}.${file.fileType}`, `${file.srcDir}/${file.folder}/${file.newFilename}.${file.fileType}`, function (err) {
    if (err) throw err;
  })
  console.log(`
    [ ${file.fileCount.current} / ${file.fileCount.total} ] Renamed "${file.oldFilename}" to "${file.newFilename}"
  `);
  res.json(file);
};

module.exports.revertFiles = (req, res) => {
  let files = req.body

  files.forEach((file) => {
    fs.rename(`${file.srcDir}/${file.folder}/${file.newFilename}.${file.fileType}`, `${file.srcDir}/${file.oldFilename}.${file.fileType}`, function (err) {
      if (err) throw err;
      console.log(`Reverted file "${file.newFilename}" to "${file.oldFilename}"`);
    })
  });

  res.json(files);
};
