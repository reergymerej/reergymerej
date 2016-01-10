var express = require('express');
var router = express.Router();

var isValid = function (username, password) {
    return username === 'dude' && password === 'password';
};

router.post('/login', function (req, res, next) {
    // TODO: hardcoding
    var username = req.body.username;
    var password = req.body.password;
    var valid = isValid(username, password);

    req.session.views = req.session.views || 0;
    req.session.views++;
    console.log(req.session.views);

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
