const express = require('express');
const { getProducts, getProductsBySku } = require('../models/products');
const router = express.Router();

module.exports = (app) => {

    app.use('/products', router);

    router.get('/', getProducts);

    router.get('/:sku', getProductsBySku);

};