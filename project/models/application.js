var db = require('../db.js');
//var SQLHelper = require('../helpers/sqlHelper');
var DateHelper = require('../helpers/date.js');
//var ArrayHelper = require('../helpers/arrayHelper.js');
var squel = require("squel");
var tableName = "applications";
var tableColumns = ["id", "description", "sc_ka", "failure_fault_ka", "sc_duration", "n_shots", "from_time", "to_time", "user_id", "cancel_request"];

exports.get = function (id, done) {
    var sql = squel.select()
        .field(tableName + ".*")
        .field("approvals.id", "approval_id")
        .from(tableName)
        .left_join("approvals", null, tableName + ".id = approvals.application_id");
    if (id != null && !isNaN(id)) {//qualifies if id != "" and id!=null and id is a number
        sql.where(tableName + ".id = " + id);
    }
    //console.log("sql for Application get is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.create = function (description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, done) {
    var f_time_sql = DateHelper.getDateTimeString(new Date(from_time) - 5.5 * 60 * 60 * 1000);
    var t_time_sql = DateHelper.getDateTimeString(new Date(to_time) - 5.5 * 60 * 60 * 1000);
    var insertColumns = tableColumns.slice(1, tableColumns.length - 1);
    var values = [description, sc_ka, failure_fault_ka, sc_duration, n_shots, f_time_sql, t_time_sql, user_id];
    var sql = squel.insert()
        .into(tableName);
    for (var i = 0; i < insertColumns.length; i++) {
        sql.set(insertColumns[i], "?", {dontQuote: true});
    }
    //console.log("The application update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};

exports.update = function (id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, done) {
    var f_time_sql = DateHelper.getDateTimeString(new Date(from_time) - 5.5 * 60 * 60 * 1000);
    var t_time_sql = DateHelper.getDateTimeString(new Date(to_time) - 5.5 * 60 * 60 * 1000);
    var updateColumns = tableColumns.slice(1, tableColumns.length - 1);
    var values = [description, sc_ka, failure_fault_ka, sc_duration, n_shots, f_time_sql, t_time_sql, user_id];
    var sql = squel.update()
        .table(tableName);
    for (var i = 0; i < updateColumns.length; i++) {
        sql.set(updateColumns[i], "?", {dontQuote: true});
    }
    sql.where(tableColumns[0] + " = " + id);
    //console.log("The application update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};

exports.delete = function (id, done) {
    var sql = squel.delete()
        .from(tableName)
        .where(tableColumns[0] + " = " + id);
    console.log("The application delete SQL query is " + sql.toString());
    db.get().query(sql.toString(), function (err, result) {
        if (err) return done(err);
        done(null, result);
    });
};