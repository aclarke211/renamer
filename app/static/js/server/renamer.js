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
  const fileTypes = {
    mainType: '.mp4',
    types: ['.m4a', '.avi', '.wmv', '.mkv'],
  };

  const path = `${content.srcDir}/${content.oldFilename}`;

  if (fs.existsSync(`${path}${fileTypes.mainType}`)) {
    content.foundStatus = true;
    content.fileType = fileTypes.mainType;
    console.log(`FILE "${content.oldFilename}${fileTypes.mainType}" FOUND!`);
  } else {
    fileTypes.types.forEach(type => {
      if (fs.existsSync(`${path}${type}`)) {
        content.foundStatus = true;
        content.fileType = type;
        console.log(`FILE "${content.oldFilename}${type}" FOUND!`);
      }
    });

    if (!content.foundStatus) {
      console.log(`Cannot find file: "${content.oldFilename}"`);
    }
  }

  return content;
}
