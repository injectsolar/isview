var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');
var Approval = require('../models/approval.js');
var Email_Token = require('../models/email_token.js');
var User = require('../models/User_Mysql');

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

router.get("/verifytoken", function (req, res, next) {
    var token = req.query.token;
    // get the user by token and then if the user is present, mark the user as verified via email
    Email_Token.getByToken(token, function (err, tokenRows) {
        if (err) {
            return next(err);
        }
        // rows will be like [{"id":2,"users_id":7,"token":"e3acd91b03ec3a2223d7fe90884d236f6c87f4c1","expires_at":"2016-11-23T13:37:32.000Z","created_at":"2016-11-22T13:37:32.000Z"}]

        // get the user by users_id
        if (!(tokenRows.length > 0 && tokenRows[0].users_id != undefined)) {
            res.json({message: "user was not found by this token to verify"});
        }
        // checking the token expiration
        var dateDiff = (new Date()).getTime() - (new Date(tokenRows[0].expires_at)).getTime();
        if (dateDiff > 0) {
            res.json({message: "This email verification link was expired " + Math.round(dateDiff / (10 * 3600 * 24)) / 100 + " days ago..."});
            return;
        }
        User.get(tokenRows[0].users_id, function (err, users) {
            if (err) {
                return next(err);
            }
            // rows will be like [{"id":7,"username":"sudhir","emailid":"nagasudhirpulla@gmail","password":"abc123","fname":"NA","lname":"NA","phone":"NA","address":"NA","created_at":"2016-11-22T13:37:32.000Z","updated_at":"2016-12-04T06:35:47.000Z","is_verified":0}]
            // console.log("users rows are " + JSON.stringify(users));

            if (users[0].is_verified == 1) {
                res.json({message: "The user is already verified via email"});
                return;
            }

            User.updateIsVerifiedValue(users[0].id, 1, function (err, result) {
                if (err) {
                    return next(err);
                }
                //console.log("result of user update verified is " + JSON.stringify(result));
                res.json({message: "The user is verified via email"});
            });
        });
    });
});
module.exports = router;
