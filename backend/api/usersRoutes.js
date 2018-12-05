'use strict';

const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

let User = require('../models/Users.js');

//get all users
router.get('/', checkOwner, function(req, res) {
    User.find(function(err, users){
        if (err){
            res.status(500);
            res.send();
        }
        else {
            res.status(200);
            res.json(users);
        }
    })
});




//create user
router.post('/', checkOwner,function(req, res){
    let user = new User();
    user.username = req.body.username;
    user.role = req.body.role;
    let pass = req.body.password;
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(pass, salt, function (err, hash) {
            if (err) {
                console.log(err);
            }
            else {
                user.password = hash;
                user.save(function(err){
                    if (err){
                        console.log(err);
                        res.status(400);
                        res.send(user);
                    } else {
                        res.status(200);
                        res.send(user);
                    }
                });
            }
        })
    });


});

//delete user by id
router.delete('/:id', checkOwner, function(req, res) {
    User.findByIdAndDelete(req.params.id, function(err){
        if (err){
            res.status(500);
            res.send();
        }
        else {
            res.status(200);
            res.send();
        }
    });
});


router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    }) (req, res, next)
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//get user by id
router.get('/:id', function(req, res){
    if(req.user || process.env.NODE_ENV ==='test'){
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.status(404);
                res.send();
            } else {
                res.status(200);
                res.json(user);
            }
        });
    }
    else {
        res.status(403);
        res.send();
    }
});

function checkOwner(req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'Owner' || process.env.NODE_ENV === 'test'){
        return next();
    }
    else res.redirect('/');
}


module.exports = router;

