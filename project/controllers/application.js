var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Application.get(req.query.id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'applications': rows});
    });
});


router.post('/', function (req, res, next) {
    if (req.user.username != "nhptl" && req.user.username != "admin") {
        return next(new Error("user is not nhptl or admin"));
    }
    var description = req.body["description"];
    var sc_ka = req.body["sc_ka"];
    var failure_fault_ka = req.body["failure_fault_ka"];
    var sc_duration = req.body["sc_duration"];
    var n_shots = req.body["n_shots"];
    var from_time = req.body["from_time"];
    var to_time = req.body["to_time"];
    var user_id = req.user.id;
    //console.log("Username is " + req.user.username);
    Application.create(description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({'application_id': result.insertId});
    });
});

router.put('/', function (req, res, next) {
    if (req.user.username != "nhptl" && req.user.username != "admin") {
        return next(new Error("user is not nhptl or admin"));
    }
    var id = req.body["application_id"];
    var description = req.body["description"];
    var sc_ka = req.body["sc_ka"];
    var failure_fault_ka = req.body["failure_fault_ka"];
    var sc_duration = req.body["sc_duration"];
    var n_shots = req.body["n_shots"];
    var from_time = req.body["from_time"];
    var to_time = req.body["to_time"];
    var user_id = req.user.id;

    Application.update(id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

router.delete('/', function (req, res, next) {
    if (req.user.username != "nhptl" && req.user.username != "admin") {
        return next(new Error("user is not nhptl or admin"));
    }
    var id = req.body["application_id"];
    Application.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});


module.exports = router;