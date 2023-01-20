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

    router.post('/items', async (req, res, next) => {
        try {
            const response = await addToCart(req);
            
            res.status(201).send(response);
        } catch (err) {
            next(err)
        };
    });

    // curl -d '{"sku":"MTQ440T103", "qty":"4"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cart/items -b cookie-file.txt

    router.get('/', async (req, res, next) => {
        try {
            const response = await getCartById(req);

            res.status(200).send(response);
        } catch (err) {
            next(err)
        };
    });

    router.get('/checkout', checkout);

};