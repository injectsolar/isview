var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');
var Approval = require('../models/approval.js');
var Email_Token = require('../models/email_token.js');
var User = require('../models/User_Mysql');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

router.get('/showusers', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    User.get(7, function (err, users) {
        if (err) {
            return done(err);
        }
        res.json({users: users});
    });

});

module.exports = router;
