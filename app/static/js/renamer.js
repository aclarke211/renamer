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
  const path = `${dir}/${filename}`
  if (fs.existsSync(path)) {
    console.log(`FILE "${filename}" FOUND!`)
  } else {
    console.log(`Cannot find file: "${filename}"`)
  }
}
