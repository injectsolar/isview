var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User_Mysql');
var Email_Token = require('../models/email_token');
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
                    return done(null, false, req.flash('signupMessage', 'That username is already taken'));
                } else {
                    User.create(email, User.generateHash(password), req.param('usermail'), function (err) {
                        if (err)
                            throw err;
                        //create the verification token table entry
                        Email_Token.create(email, function (err, insertId) {
                            if (err) {
                                return next(err);
                            }
                            //created the user verification token table entry also
                            return done(null, users[0]);
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
                if (!users[0])
                    return done(null, false, req.flash('loginMessage', 'No User found'));
                if (!User.validPassword(password, users[0].password)) {
                    return done(null, false, req.flash('loginMessage', 'invalid password'));
                }
                return done(null, users[0]);
            });
        });
    }
));

exports.get = function () {
    return passport;
};