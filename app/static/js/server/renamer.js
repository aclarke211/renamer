var fs = require('fs');

module.exports.findFile = (req, res) => {
  let content = req.body;

  console.log('*****************');
  console.log('RECEIVED CONTENT:');
  console.log(content);
  console.log('*****************');

  content = checkFileExists(content);
  res.json(content);
};

function checkFileExists(content) {

  content.files.forEach((file) => {
    const path = `${file.srcDir}/${file.oldFilename}`;

    if (fs.existsSync(`${path}${file.fileTypes.mainType}`)) {
      file.foundStatus = true;
      file.fileType = file.fileTypes.mainType;
      console.log(`FILE "${file.oldFilename}${file.fileType}" FOUND!`);
    } else {
      file.fileTypes.types.forEach(type => {
        if (fs.existsSync(`${path}${type}`)) {
          file.foundStatus = true;
          file.fileType = type;
          console.log(`FILE "${file.oldFilename}${file.fileType}" FOUND!`);
        }
      });

      if (!file.foundStatus) {
        console.log(`Cannot find file: "${file.oldFilename}"`);
      }
    }
  });

  return content;
}
