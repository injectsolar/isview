//var bcrypt = require('bcryptjs');
var db = require('../db.js');
var SQLHelper = require('../helpers/sqlHelper');

exports.create = function (userName, password, usermail, fname, lname, phone, address, done) {
    var values = [userName, password, usermail, fname, lname, phone, address];
    db.get().query('INSERT INTO users (username, password, emailid, fname, lname, phone, address) VALUES(?, ?, ?, ?, ?, ?, ?)', values, function (err, result) {
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

exports.deleteByName = function (name, done) {
    var values = [name];
    db.get().query('DELETE FROM users WHERE username = ?', values, function (err, result) {
        if (err) return done(err);
        //console.log("Number of rows deleted is " + result.affectedRows);
        done(null, result);
    })
};

//stub
exports.updateIsVerifiedValue = function (id, val, done) {
    var values = [val, id];
    db.get().query('UPDATE users SET is_verified = ? WHERE id = ?', values, function (err, result) {
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