const LocalStrategy = require('passport-local').Strategy;
const User = require('../backend/models/Users');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //Local Strategy for user login

    passport.use(new LocalStrategy(function(username, password, done){
        let query = {username:username};
        User.findOne(query, function(err, user){
            if (err) console.log(err);
            if (!user){
                return done(null, false, {message: 'No user found'});
            }


            bcrypt.compare(password, user.password, function(err, isMatch){
                if (err) throw err;

                if(isMatch){
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        let query = {_id: id};
        User.findOne(query, function(err, user) {
            if (err) throw err;
           done(err, user);
        });
    })
};