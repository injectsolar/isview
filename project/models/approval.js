var db = require('../db.js');
//var SQLHelper = require('../helpers/sqlHelper');
var DateHelper = require('../helpers/date.js');
//var ArrayHelper = require('../helpers/arrayHelper.js');
var squel = require("squel");
var tableName = "approvals";
var tableColumns = ["id", "application_id", "description", "sc_ka", "failure_fault_ka", "sc_duration", "n_shots", "from_time", "to_time", "user_id", "fees", "is_cancelled"];

exports.get = function (id, done) {
    var sql = squel.select()
        .from(tableName);
    if (id != null && !isNaN(id)) {//qualifies if id != "" and id!=null and id is a number
        sql.where("id = " + id);
    }
    //console.log("sql for Approval get is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.create = function (application_id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, fees, done) {
    var f_time_sql = DateHelper.getDateTimeString(new Date(from_time) - 5.5 * 60 * 60 * 1000);
    var t_time_sql = DateHelper.getDateTimeString(new Date(to_time) - 5.5 * 60 * 60 * 1000);
    var insertColumns = tableColumns.slice(1, tableColumns.length - 1);
    var values = [application_id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, f_time_sql, f_time_sql, user_id, fees];
    var sql = squel.insert()
        .into(tableName);
    for (var i = 0; i < insertColumns.length; i++) {
        sql.set(insertColumns[i], "?", {dontQuote: true});
    }
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};

exports.update = function (id, application_id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, fees, done) {
    var f_time_sql = DateHelper.getDateTimeString(new Date(from_time) - 5.5 * 60 * 60 * 1000);
    var t_time_sql = DateHelper.getDateTimeString(new Date(to_time) - 5.5 * 60 * 60 * 1000);
    var updateColumns = tableColumns.slice(1, tableColumns.length - 1);
    var values = [application_id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, f_time_sql, t_time_sql, user_id, fees];
    var sql = squel.update()
        .table(tableName);
    for (var i = 0; i < updateColumns.length; i++) {
        sql.set(updateColumns[i], "?", {dontQuote: true});
    }
    sql.where(tableColumns[0] + " = " + id);
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};

exports.delete = function (id, done) {
    var sql = squel.delete()
        .from(tableName)
        .where(tableColumns[0] + " = " + id);
    //console.log("The Approval delete SQL query is " + sql.toString());
    db.get().query(sql.toString(), function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};