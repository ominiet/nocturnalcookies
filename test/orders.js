'use strict';

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Order = require("../backend/models/Orders");

//require testing packages
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

//clear table of order
describe('Orders', function() {
    before(function (done) {
        Order.remove({}, function (err) {
            done();
        });
    });

    let orderId;
//test get all order
    describe('/GET orders', function () {
        it('it should GET all the orders', function (done) {
            chai.request(app)
                .get('/api/orders')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
//test create order
    describe('/POST orders', function () {
        it('it should respond with the created user', function (done) {
            let order = {
                "name": "Test Name",
                "building": "Test Building",
                "room": "123",
                "payment": "Venmo",
                "delivered": false,
                "cc": "1",
                "dc": "2",
                "sd": "3",
                "om": "4",
                "phoneNumber": "123141234"
            };
            chai.request(app)
                .post('/api/orders')
                .send(order)
                .end(function (err, res) {
                    orderId = res.body._id;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    done();
                });
        });
    });

    describe("/GET orders/:id", function() {
        it('it should GET all the order', function (done) {
            chai.request(app)
                .get('/api/orders')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
        it('it should respond with the identified order', function (done){
            chai.request(app)
                .get('/api/orders/' + orderId)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    done();
                });
        });
        it('should fail when an invalid id is sent', function(done){
            chai.request(app)
                .get('/api/orders/1234')
                .end(function(err,res){
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/PUT /orders/:id', function(){
        let order = {
            "name": "Test Name",
            "building": "Test Building",
            "room": "123",
            "payment": "Venmo",
            "delivered": true,
            "cc": "1",
            "dc": "2",
            "sd": "3",
            "om": "4",
            "phoneNumber": "123141234"
        };
        it('should update the item when presented with valid new item', function(done){
            chai.request(app)
                .put('/api/orders/' + orderId)
                .send(order)
                .end(function(err, res){
                   res.should.have.status(200);
                   res.body.should.have.property('delivered').eql(true);
                    done();
                });
        });
        it('should not update when there is a bad id', function(done){
            chai.request(app)
                .put('/api/orders/' + "1231451")
                .send(order)
                .end(function(err, res){
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe('/DELETE /orders/:id', function(){
        it('should delete the item', function(done){
            chai.request(app)
                .delete('/api/orders/' + orderId)
                .end(function(err, res){
                    res.should.have.status(200);
                    done();
                });
        });
    });

});

