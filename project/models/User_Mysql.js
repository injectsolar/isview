//var bcrypt = require('bcryptjs');
var db = require('../db.js');
var SQLHelper = require('../helpers/sqlHelper');

exports.create = function (userName, password, usermail, done) {
    var values = [userName, password, usermail];
    db.get().query('INSERT INTO users (username, password, emailid) VALUES(?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        //console.log("created user with name " + userName + " with ID " + result.insertId);
        done(null, result.insertId);
    })
};

exports.get = function (id, done) {
    var values = [id];
    db.get().query('SELECT * FROM users WHERE id = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getAll = function (done) {
    db.get().query(SQLHelper.createSQLGetString('users', ['username', 'password'], [], []), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getByName = function (name, done) {
    var values = [name];
    db.get().query('SELECT * FROM users WHERE username = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getByEmail = function (emailId, done) {
    var values = [emailId];
    db.get().query('SELECT * FROM users WHERE emailid = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.deleteByName = function (name, done) {
    var values = [name];
    db.get().query('DELETE FROM users WHERE username = ?', values, function (err, result) {
        if (err) return done(err);
        //console.log("Number of rows deleted is " + result.affectedRows);
        done(null, result);
    })
};

exports.deleteById = function (name, done) {
    var values = [name];
    db.get().query('DELETE FROM users WHERE id = ?', values, function (err, result) {
        if (err) return done(err);
        //console.log("Number of rows deleted is " + result.affectedRows);
        done(null, result);
    })
};

exports.updateIsVerifiedValue = function (id, val, done) {
    var values = [val, id];
    db.get().query('UPDATE users SET is_verified = ? WHERE id = ?', values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    })
};

exports.updatePassword = function (id, val, done) {
    var values = [val, id];
    db.get().query('UPDATE users SET password = ? WHERE id = ?', values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    })
};

exports.generateHash = function (password) {
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    return password;
};

exports.validPassword = function (password, encryptedPassword) {
    //return bcrypt.compareSync(password, encryptedPassword);
    return (password == encryptedPassword);
};