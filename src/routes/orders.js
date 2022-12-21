const express = require('express');
const { getOrders, getOrderById } = require('../models/order');
const router = express.Router();

module.exports = (app) => {

    app.use('/orders', router);

    router.get('/orders', getOrders);

    router.get('/orders/:id', getOrderById);
    
};