const express = require('express');
const path = require('path');
const colors = require('colors');
const compileSass = require('express-compile-sass');
const root = process.cwd();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5555;
const Renamer = require('./static/js/renamer');

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
  .post("/find-file", Renamer.findFile)
  .listen(PORT, () => {
    console.log(colors.black.bgGreen('RENAMER running...'));
    console.log(colors.yellow('Listening on:'));
    console.log(colors.cyan(`http://localhost:${PORT}`));
  });
