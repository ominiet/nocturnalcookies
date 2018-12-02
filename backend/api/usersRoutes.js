'use strict';

const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

let User = require('../models/Users.js');

//get all users
router.get('/', ensureAuthenticated, function(req, res) {
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
router.post('/', ensureAuthenticated, function(req, res){
    console.log(req.body);
    let user = new User();
    user.username = req.body.username;
    //user.password = req.body.password;
    user.role = req.body.role;
    let pass = req.body.password;
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(pass, salt, function (err, hash) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Password was: " + pass);
                console.log("Password is now " + hash);
                user.password = hash;
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
            }
        })
    });


});

//update user by id (requires all fields filled out)
//TODO: update so that only password and role can be updated
/*router.put('/:id', function(req,res){

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
});*/

//delete user by id
router.delete('/:id', ensureAuthenticated, function(req, res) {
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


router.post('login', function(req, res, next) {
    passport.authenticate('local', {    successRedirect: '/',
                                        failureRedirect: '/users/login',
                                        failureFlash: true

    }) (req, res, next)
});

router.get('logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    else {
        //handle better (send response code)
        res.redirect('/');
    }
}


module.exports = router;

//TODO: go back and fix routes when they work with front end
