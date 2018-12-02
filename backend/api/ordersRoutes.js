'use strict';

const express = require('express'),
    router = express.Router();

let Order = require('../models/Orders');

//get all orders
router.get('/',function(req, res) {
    console.log(req.body);
    Order.find(function(err, orders){
        if (err){
            res.status(500);
            res.send();
        }
        else {
            res.status(200);
            res.json(orders);
            res.send();
        }
    })
});


//get order by id
router.get('/:id', function(req, res){
    Order.findById(req.params.id, function(err, order){
        if (err){
            console.log(err);
            res.status(404);
            res.send();
        }else {
            res.status(200);
            res.json(order);
            res.send();
        }
    });
});

//create user
router.post('/', function(req, res){

    let order = new Order();
    order.name = req.body.name;
    order.building = req.body.building;
    order.room = req.body.room;
    order.orderTime = Date.now();
    order.payment = req.body.payment;
    order.delivered = req.body.delivered;
    order.cc = req.body.cc;
    order.dc = req.body.dc;
    order.sd = req.body.sd;
    order.om = req.body.om;
    order.phoneNumber = req.body.phoneNumber;

    order.save(function(err, order){
        if (err){
            console.log(err);
            res.status(400);
            res.send();
        } else {
            res.status(200);
            res.json(order);
            res.send();
        }
    });
});
//Order
//update user by id (requires all fields filled out)

router.put('/:id', function(req,res){

    Order.findByIdAndUpdate(req.params.id, { $set: {
            name: req.body.name,
            building: req.body.building,
            room: req.body.room,
            orderTime: req.body.orderTime,
            payment: req.body.payment,
            delivered: req.body.delivered,
            phoneNumber: req.body.phoneNumber,
            cc: req.body.cc,
            dc: req.body.dc,
            sd: req.body.sd,
            om: req.body.om
        }
    }, { new: true }, function(err, order){
        if (err) {
            console.log(err);
            res.status(500);
            res.send();
        }
        else{
            res.status(200);
            res.json(order);
            res.send();
        }
    })
});

//delete order by id
router.delete('/:id', function(req, res) {
    Order.findByIdAndDelete(req.params.id, function(err){
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
