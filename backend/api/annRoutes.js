'use strict';

const express = require('express'),
    router = express.Router(),
    Announcement = require('../models/Announcements');

router.get('/', function(req, res){
    Announcement.find(function (err, anns){
        if (err){
            res.status(500);
            res.send();
        }
        else {
            res.status(200);
            res.json(anns);
            res.send();
        }
    })
});

//create user
router.post('/', function(req, res){
    let ann = new Announcement();

    if (req.body.user){
        ann.user = req.body.user;
    }

    ann.title = req.body.title;
    ann.body = req.body.body;

    ann.save(function(err){
        if (err){
            console.log(err);
            res.status(400);
            res.send();
        } else {
            res.status(200);
            res.send();
        }
    });
});

//update announcement (only update title and body)
router.put('/:id', function(req,res){

    Announcement.findByIdAndUpdate(req.params.id, { $set: {
            'title': req.body.title,
            'body': req.body.body
        }
    }, { new: true }, function(err, ann){
        if (err) {
            console.log(err);
            res.status(500);
            res.send();
        }
        else{
            res.status(200);
            res.json(ann);
            res.send();
        }
    })
});

//delete user by id
router.delete('/:id', function(req, res) {
    Announcement.findByIdAndDelete(req.params.id, function(err){
        if (err){
            res.status(500);
            res.send();
            console.log(err);
        }
        else {
            res.status(200);
            res.send();
        }
    });
});

module.exports = router;