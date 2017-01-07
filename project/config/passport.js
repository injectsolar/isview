var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User_Mysql');
var UserDetail = require('../models/user_detail');
var Email_Token = require('../models/email_token');
var Email_Helper = require('../helpers/mailHelper');
var passport = require('passport');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.get(id, function (err, users) {
        done(err, users[0]);
    });
});

passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.getByName(email, function (err, users) {
                if (err)
                    return done(err);
                if (users[0]) {
                    return done(null, false, req.flash('loginMessage', 'That username is already taken'));
                } else {
                    if (req.param('password') != req.param('confirmpassword')) {
                        return done(null, false, req.flash('loginMessage', "password and confirm password fields did not match"));
                    }
                    User.create(email, User.generateHash(password), req.param('usermail'), function (err, userId) {
                        if (err)
                            return done(err);
                        // create user details
                        UserDetail.create(userId, req.param('device_id'), req.param('system_size'), req.param('solar_pv'), req.param('solar_inverter'), req.param('full_name'), req.param('phone'), req.param('address'), function (err, insertId) {
                            if (err) {
                                // Delete the created user
                                User.deleteById(userId, function (err, result) {
                                    if (err) {
                                        return done(err);
                                    }
                                });
                                return done(err);
                            }
                            //create the verification token table entry
                            Email_Token.create(email, function (err, tokenInsertId) {
                                if (err) {
                                    return next(err);
                                }
                                //created the user verification token table entry also
                                //Use the token id  to get the user id and using user id get the user email address

                                //get the token by token table row id
                                Email_Token.get(tokenInsertId, function (err, tokens) {
                                    if (err) {
                                        return next(err);
                                    }
                                    var token = tokens[0].token;
                                    var user_id = tokens[0].users_id;
                                    // get the user by his token table users_id
                                    User.get(user_id, function (err, users) {
                                        if (err) return done(err);
                                        //user id obtained
                                        var userEmail = users[0].emailid;
                                        var target_email_id = userEmail;
                                        var fromAddress = 'info@injectsolar.com';
                                        var subject = 'User Email Verification';
                                        var text = 'Via Sendgrid';
                                        var html = "Click the following link to verify the mail <br> " + "localhost:3000/?verymailtoken=" + token;
                                        Email_Helper.sendVerificationEmail(userEmail, fromAddress, subject, text, html, function (err, response) {
                                            if (err) {
                                                return done(err);
                                            }
                                            console.log("Sendgrid response is" + JSON.stringify(response));
                                            return done(null, false, req.flash('loginMessage', "Signup completed, please check mail to verify your account..."));
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            });
        });
    }));

passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.getByName(email, function (err, users) {
                if (err)
                    return done(err);
                if (!users[0]) {
                    User.getByEmail(email, function (err, users) {
                        if (err) {
                            return done(err);
                        }
                        if (!users[0]) {
                            return done(null, false, req.flash('loginMessage', 'No User found'));
                        }
                        if (!User.validPassword(password, users[0].password)) {
                            return done(null, false, req.flash('loginMessage', 'invalid password'));
                        }
                        return done(null, users[0]);
                    });
                } else {
                    if (!User.validPassword(password, users[0].password)) {
                        return done(null, false, req.flash('loginMessage', 'invalid password'));
                    }
                    return done(null, users[0]);
                }
            });
        });
    }
));

exports.get = function () {
    return passport;
};
