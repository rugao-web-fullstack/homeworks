module.exports = function (req, res) {
    res.write('inside  users\n');
    console.log(req.params);
    res.write("\n");
    res.write(req.mid + "\n");
    res.end();
};