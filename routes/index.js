var express = require('express');
var router = express.Router();

var isValid = function (username, password) {
    return username === 'dude' && password === 'password';
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
    // TODO: hardcoding
    var username = req.body.username;
    var password = req.body.password;
    var valid = isValid(username, password);

    if (valid) {
        req.session.authenticated = true;
    }

    res.json({
        success: valid,
    });
});

router.post('/secured', function (req, res, next) {
    if (req.session.authenticated) {
        res.jsonp({
            secret: 'just for you',
        });
    } else {
        res.status(403).end();
    }
});

module.exports = router;
