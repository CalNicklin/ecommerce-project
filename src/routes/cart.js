const express = require('express');
const { createCart, addToCart, getCartById, checkout } = require('../models/cart');
const router = express.Router();

module.exports = (app) => {

    app.use('/cart', router);

    router.post('/', async (req, res, next) => {
        try {
            const response = await createCart(req);
            
            res.status(201).send(response);

        } catch (err) {
            next(err)
        };
    });

    router.post('/items', addToCart);
    // curl -d '{"sku":"MTQ440T103", "qty":"4"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cart/items -b cookie-file.txt

    router.get('/', getCartById);

    router.get('/checkout', checkout);

};