module.exports = function(req,res){
  res.write('inside users\n');
  res.write(req.mid + '\n');
  res.end();
};