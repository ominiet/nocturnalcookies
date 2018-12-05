'use strict';

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require("../backend/models/Users");

//require testing packages
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

//clear table of users
describe('Users', function() {
    before(function (done) {
        User.remove({}, function (err) {
            done();
        });
    });


//test get all users
    describe('/GET users', function () {
        it('it should GET all the users', function (done) {
            chai.request(app)
                .get('/api/users')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
//test create user
    describe('/POST user', function () {
        it('it should respond with the created user', function (done) {
            let user = {
                "username": "username",
                "role": "Employee",
                "password": "password"
            };
            chai.request(app)
                .post('/api/users')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    done();
                });
        });
    });


//test loggedin
    describe('Login', function () {
        it('it should return 401 when not logged in', function (done) {
            chai.request(app)
                .get('/loggedin')
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                })
        });
    });

});

// describe('/Post /api/users/login', function(){
//     it ('it should log the user in', function(done){
//         let user = {"username": "test-owner", "password": "pass"};
//
//         chai.request(app)
//             .post('/api/users/login', user);
//     })
// });

