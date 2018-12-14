var fs = require('fs');

module.exports.findFile = (req, res) => {
  const content = req.body;
  res.json(content);

  console.log('*****************');
  console.log('RECEIVED CONTENT:');
  console.log(content);
  console.log('*****************');


  checkFileExists(content.srcDir, content.oldFilename);
}

function checkFileExists(dir, filename) {
  let fileFound = false;

  const fileTypes = {
    mainType: ".mp4",
    types: [".m4a", ".avi", ".wmv", ".mkv"]
  };

  const path = `${dir}/${filename}`;

  if (fs.existsSync(`${path}${fileTypes.mainType}`)) {
    fileFound = true;
    console.log(`FILE "${filename}${fileTypes.mainType}" FOUND!`)
  } else {

    fileTypes.types.forEach((type) => {
      if (fs.existsSync(`${path}${type}`)) {
        fileFound = true;
        console.log(`FILE "${filename}${type}" FOUND!`)
      }
    });

    if (!fileFound) {
      console.log(`Cannot find file: "${filename}"`)
    }
  }
}
