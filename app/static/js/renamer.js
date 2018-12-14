module.exports.findFile = (req, res) => {
  const content = req.body;
  res.json(content);

  console.log('ALL CONTENT:');
  console.log(content);
  console.log('------------------');
  console.log('Src Dir:');
  console.log(content.srcDir);
  console.log('*****************');
}
