var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Geo',
        values: "Geo 小乔的测试页.".length
    });
});
router.post('/post', function(req, res, next) {
    console.log(req.body);
    res.end(JSON.stringify(req.body));
});
module.exports = router;
