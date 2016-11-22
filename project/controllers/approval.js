var express = require('express');
var router = express.Router();
var Approval = require('../models/approval.js');

router.get('/', function (req, res) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Approval.get(req.query.id, function (err, rows) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'approvals': rows});
    });
});


router.post('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var application_id = req.body["application_id"];
    var description = req.body["description"];
    var sc_ka = req.body["sc_ka"];
    var failure_fault_ka = req.body["failure_fault_ka"];
    var sc_duration = req.body["sc_duration"];
    var n_shots = req.body["n_shots"];
    var from_time = req.body["from_time"];
    var to_time = req.body["to_time"];
    var fees = req.body["fees"];
    var user_id = req.user.id;
    //console.log("Username is " + req.user.username);
    Approval.create(application_id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, fees, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({'approval_id': result.insertId});
    });
});

router.put('/', function (req, res) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var id = req.body["approval_id"];
    var application_id = req.body["application_id"];
    var description = req.body["description"];
    var sc_ka = req.body["sc_ka"];
    var failure_fault_ka = req.body["failure_fault_ka"];
    var sc_duration = req.body["sc_duration"];
    var n_shots = req.body["n_shots"];
    var from_time = req.body["from_time"];
    var to_time = req.body["to_time"];
    var fees = req.body["fees"];
    var user_id = req.user.id;

    Approval.update(id, application_id, description, sc_ka, failure_fault_ka, sc_duration, n_shots, from_time, to_time, user_id, fees, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});

router.delete('/', function (req, res) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var id = req.body["approval_id"];
    Approval.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});


module.exports = router;