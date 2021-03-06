const express = require('express');
const path = require('path');
const colors = require('colors');
const compileSass = require('express-compile-sass');
const root = process.cwd();
const bodyParser = require('body-parser');
const config = require('../config/default.json');
const pjson = require('../package.json');

const PORT = process.env.PORT || config.port.local || 5555;
const Renamer = require('./static/js/server/renamer');

express()
  .use(compileSass({
    root: root,
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: true, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: false // If true, will log to console.error on errors
  }))
  .use(bodyParser.json())
  .use(express.static(root))
  .use(express.static(path.join(__dirname, 'static')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .get('/getPackageJson', (req, res) => { res.json(pjson) })
  .post("/find-file", Renamer.findFile)
  .post("/rename-file", Renamer.renameFile)
  .post("/revert-files", Renamer.revertFiles)
  .post("/del-folders", Renamer.delFolders)
  .post("/sort-files", Renamer.sortFiles)
  .post("/find-and-replace", Renamer.findAndReplace)
  .post("/replaceFilenames", Renamer.replaceFilenames)
  .listen(PORT, () => {
    console.log(colors.black.bgGreen('RENAMER running...'));
    console.log(colors.yellow('Listening on:'));
    console.log(colors.blue(`http://localhost:${PORT}`));
  });
