//var bcrypt = require('bcryptjs');
var db = require('../db.js');
var SQLHelper = require('../helpers/sqlHelper');

exports.create = function (users_id, device_id, system_size, solar_pv, solar_inverter, full_name, phone, address, done) {
    var values = [users_id, device_id, system_size, solar_pv, solar_inverter, full_name, phone, address];
    db.get().query('INSERT INTO user_details (users_id, device_id, system_size, solar_pv, solar_inverter, full_name, phone, address) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);
        //console.log("created user with name " + userName + " with ID " + result.insertId);
        done(null, result.insertId);
    })
};

exports.get = function (id, done) {
    var values = [id];
    db.get().query('SELECT * FROM user_details WHERE id = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getAll = function (done) {
    db.get().query(SQLHelper.createSQLGetString('user_details', ['*'], [], []), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};

exports.getByUserId = function (users_id, done) {
    var values = [users_id];
    db.get().query('SELECT * FROM user_details WHERE users_id = ?', values, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    })
};