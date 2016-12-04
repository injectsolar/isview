var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');
var Approval = require('../models/approval.js');
var Email_Token = require('../models/email_token.js');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

router.get('/', function (req, res) {
    res.redirect('/home');
});

router.get('/signupemailsent', function (req, res) {
    res.render('signupemailsent');
});

router.get('/home', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    res.render('home', {user: req.user});
});

router.get('/application-create', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    res.render('application-create', {user: req.user});
});

router.get('/application-update', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'application_data': {}};
    var app_id = req.query.id;
    if (typeof app_id == 'undefined') {
        app_id = null;
    }
    responseData.application_id = app_id;
    Application.get(app_id, function (err, rows) {
        if (err) return next(err);
        responseData['application_data'] = rows[0];
        res.render('application-update', responseData);
    });
});

router.get('/approval-create', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'application_data': {}};
    var app_id = req.query.id;
    if (typeof app_id == 'undefined') {
        app_id = null;
    }
    responseData.application_id = app_id;
    Application.get(app_id, function (err, rows) {
        if (err) return next(err);
        responseData['application_data'] = rows[0];
        res.render('approval-create', responseData);
    });
});

router.get('/approval-update', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user, 'approval_data': null};
    var app_id = req.query.id;
    if (typeof app_id == 'undefined') {
        app_id = null;
    }
    responseData.application_id = app_id;
    Approval.get(app_id, function (err, rows) {
        if (err) return next(err);
        responseData['approval_data'] = rows[0];
        res.render('approval-update', responseData);
    });
});

router.get('/verify', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user};

    var target_email_id = req.user.emailid;

    if (typeof target_email_id == 'undefined') {
        target_email_id = [];
    }

    //Now get the user token from token table
    Email_Token.getByUserId(req.user.id, function (err, tokenRows) {
        if (err) {
            return next(err);
        }

        var token = tokenRows[0].token;
        //Now token is obtained
        console.log("Token obtained for email sending is " + token);
        // api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
        var options = {
            auth: {
                api_key: process.env.sendgridkey
            }
        };

        var mailer = nodemailer.createTransport(sgTransport(options));

        var email = {
            to: [target_email_id],
            from: 'info@injectsolar.com',
            subject: 'User Email Verification',
            text: 'Via Sendgrid',
            html: "Click the following link to verify the mail <br> " + "abc.com/?verymailtoken=" + token
        };

        mailer.sendMail(email, function (err, response) {
            if (err) {
                //console.log(err);
                return next(err);
            }

            //console.log(res);
            res.json({"response": response});
        });
    });


});

module.exports = router;
