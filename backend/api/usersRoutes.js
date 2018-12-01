'use strict';

const express = require('express'),
    router = express.Router();

let User = require('../models/Users.js');

//get all users
router.get('/',function(req, res) {
    console.log(req.body);
    User.find(function(err, users){
        if (err){
            res.status(500);
            res.send();
        }
        else {
            res.status(200);
            res.json(users);
            res.send();
        }
    })
});


//get user by id
router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err){
            console.log(err);
            res.status(404);
            res.send();
        }else {
            res.status(200);
            res.json(user);
            res.send();
        }
    });
});

//create user
router.post('/', function(req, res){
    console.log(req.body);
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.role = req.body.role;

    user.save(function(err){
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

//update user by id (requires all fields filled out)
router.put('/:id', function(req,res){

   User.findByIdAndUpdate(req.params.id, { $set: {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
       }
   }, { new: true }, function(err, user){
     if (err) {
         console.log(err);
         res.status(500);
         res.send();
     }
     else{
         res.status(200);
         res.json(user);
         res.send();
     }
   })
});

//delete user by id
router.delete('/:id', function(req, res) {
    User.findByIdAndDelete(req.params.id, function(err){
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
