var express = require('express');
var router = express.Router();

/**
 * GET users listing.
 * @description 这里的router.get('/')实际上是指的是不论之前定义的是什么路径,从该路径下再加上此处定义的路径,比如在app.js中app.use('/users'),那么实际上此处定义的路径就是"/users/"
 */
router.get('/', function users(req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
    var data = req.body,
        block = "";
    for (var i in data) {
        block += "<p><span>" + i + "</span>::<span>" + data[i] + "</span></p>";
    }
    res.send(JSON.stringify(data));
});
module.exports = router;
