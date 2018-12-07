const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5555;

express()
  .use(express.static(path.join(__dirname, 'static')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => {
    console.log('RENAMER started...');
    console.log('Listening on:');
    console.log('\x1b[36m%s\x1b[0m', `http://localhost:${PORT}`);
  });
