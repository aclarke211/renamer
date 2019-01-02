var fs = require('fs');
var path = require('path');
var recursive = require("recursive-readdir");
const colors = require('colors');

module.exports.findFile = (req, res) => {
  let content = req.body;
  console.log('RECEIVED CONTENT:');
  // console.log(content);

  content = checkFilesExist(content);
  res.json(content);
};

function checkFilesExist(content) {
  content.files.forEach(file => {
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

  console.log('FILE TO RENAME RECEIVED:');
  fs.rename(
    `${file.srcDir}/${file.oldFilename}.${file.fileType}`,
    `${file.srcDir}/${file.folder}/${file.newFilename}.${file.fileType}`,
    function (err) {
      if (err) throw err;
    },
  );
  console.log(`
    [ ${file.fileCount.current} / ${file.fileCount.total} ] Renamed "${file.oldFilename}" to "${
    file.newFilename
  }"
  `);
  res.json(file);
};

module.exports.revertFiles = (req, res) => {
  let files = req.body;
  let defaultFolder = '';

  files.forEach(file => {
    fs.rename(
      `${file.srcDir}/${file.folder}/${file.newFilename}.${file.fileType}`,
      `${file.srcDir}/${file.oldFilename}.${file.fileType}`,
      function (err) {
        if (err) throw err;
        console.log(`Reverted file "${file.newFilename}" to "${file.oldFilename}"`);
      },
    );
  });

  res.json(files);
};

module.exports.delFolders = (req, res) => {
  let folder = req.body;

  const folderToDelFrom = `${folder.srcDir}/${folder.folder}`;

  console.log('Remove directories from:');
  console.log(folderToDelFrom);

  const removeFolders = new Promise((resolve, reject) => {
    cleanEmptyFoldersRecursively(folderToDelFrom);
    resolve();
  });

  removeFolders.then(() => {
    if (fs.existsSync(folderToDelFrom)) {
      cleanEmptyFoldersRecursively(folderToDelFrom);
    }
  });

  res.json(folder);
}

function cleanEmptyFoldersRecursively(folder) {
  var isDir = fs.statSync(folder).isDirectory();
  if (!isDir) {
    return;
  }
  var files = fs.readdirSync(folder);
  if (files.length > 0) {
    files.forEach(function (file) {
      var fullPath = path.join(folder, file);
      cleanEmptyFoldersRecursively(fullPath);
    });

    // Check if parent folder is empty
    files = fs.readdirSync(folder);
  }

  if (files.length == 0) {
    console.log('removing: ', folder);
    fs.rmdirSync(folder);
    return;
  }
}

module.exports.sortFiles = (req, res) => {
  let folderToSearch = req.body.toSearch;
  console.log(colors.cyan('Searching Folder:'));
  console.log(colors.green(folderToSearch));

  const filesInFolder = {};
  const files = [];

  fs.readdirSync(folderToSearch).forEach(file => {
    if (file !== 'desktop.ini') {
      filenameMinusExtension = file.substr(0, file.lastIndexOf('.'));
      if (filenameMinusExtension !== '') {
        filesObject = {
          newFilename: filenameMinusExtension,
          oldFilename: filenameMinusExtension
        }
        files.push(filesObject);
      }
    }
  })

  filesInFolder.files = files;
  console.log(filesInFolder);

  res.json(filesInFolder);

};

module.exports.findAndReplace = (req, res) => {
  let values = req.body;
  const files = [];

  console.log(values);

  const filesToIgnore = ['*.exe', '.*'];


  recursive(values.srcDir, filesToIgnore, function(err, files) {
    const allFilenames = [];

    files.forEach((file) => {

      const filenames = {};
      filenames.old = file;
      filenames.new = '';

      if (file.indexOf(values.strings.find) !== -1) {
        newFilename = file.replace(values.strings.find, values.strings.replace);
        // console.log(colors.bgGreen(file));
        filenames.new = newFilename;
      }
      allFilenames.push(filenames);
    });

    console.log(colors.cyan('New Filenames:'));
    console.log(allFilenames);

    replaceFilenames(allFilenames);

    res.json(allFilenames);
  });
};

function replaceFilenames(filenames) {
  filenames.forEach((file) => {
    if (file.new !== '') {
      console.log(colors.bgBlue('GOING TO REPLACE:'));
      console.log(colors.bgMagenta(file.old));
      console.log('with');
      console.log(colors.green(file.new));
    }
  });
}
