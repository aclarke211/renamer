module.exports.findFile = (req, res) => {
  res.json(req.body);

  const content = req.body;

  console.log("All Passed JSON:");
  console.log(content);
  console.log('------------------');
  console.log("Single value in passed JSON:");
  console.log(content.testJSON);
  console.log('*****************');
}
