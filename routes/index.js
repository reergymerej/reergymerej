var express = require('express');
var router = express.Router();

var isValid = function (username, password) {
    return username === 'dude' && password === 'password';
};

var getUser = function () {
    return {
        authenticated: true
    };
};

router.post('/login', function (req, res, next) {
    // TODO: hardcoding
    var username = req.body.username;
    var password = req.body.password;
    var valid = isValid(username, password);

    if (valid) {
        req.session.authenticated = true;
        res.json({
            success: valid,
        });
    } else {
        res.status(401).end();
    }
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

router.get('/user', function (req, res, next) {
    var authenticated = req.session.authenticated;

    if (authenticated) {
        res.json(getUser());
    } else {
        res.status(404).end();
    }
});

module.exports = router;
