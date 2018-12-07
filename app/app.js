const express = require('express');
const path = require('path');
const colors = require('colors');

const PORT = process.env.PORT || 5555;

express()
  .use(express.static(path.join(__dirname, 'static')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => {
    console.log(colors.black.bgGreen('RENAMER started...'));
    console.log(colors.yellow('Listening on:'));
    console.log(colors.cyan(`http://localhost:${PORT}`));
  });
