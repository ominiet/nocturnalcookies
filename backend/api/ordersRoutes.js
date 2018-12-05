'use strict';

const express = require('express'),
    router = express.Router();

let Order = require('../models/Orders');

//get all orders
router.get('/', ensureAuthenticated, function(req, res) {
    Order.find(function(err, orders){
        if (err){
            res.status(500);
            res.send();
        }
        else {
            res.status(200);
            res.json(orders);
        }
    })
});


//get order by id
router.get('/:id', function(req, res){
    Order.findById(req.params.id, function(err, order){
        if (err){
            res.status(404);
            res.send();
        }else {
            res.status(200);
            res.json(order);
        }
    });
});

//create order
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

router.put('/:id', ensureAuthenticated, function(req,res){

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
router.delete('/:id', ensureAuthenticated, function(req, res) {
    Order.findByIdAndDelete(req.params.id, function(err){
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

function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated() || process.env.NODE_ENV === 'test'){
        return next();
    }
    else {
        res.redirect('/');
    }
}

module.exports = router;
