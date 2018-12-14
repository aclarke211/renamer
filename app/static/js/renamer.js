module.exports.findFile = (req, res) => {
  const content = req.body;
  res.json(content);

  console.log("All Passed JSON:");
  console.log(content);
  console.log('------------------');
  console.log("Single value in passed JSON:");
  console.log(content.testJSON);
  console.log('*****************');
}
