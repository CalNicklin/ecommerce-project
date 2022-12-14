const db = require('../db');
const moment = require('moment');
const { createOrder } = require('./order');

const createCart = async (request, response) => {
    const { id } = request.user;
    const created_at = moment.utc().toISOString();
    const modified = created_at;

    try {

        // Generate SQL statement
        const statement = `INSERT INTO cart (user_id, created_at, modified)
                           VALUES ($1, $2, $3)`;
        const values = [id, created_at, modified]

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(201).send(`Created cart for user with ID:${id}`);

    } catch (err) {
        throw new Error(err)
    };
};

const getCartById = async (request, response) => {
    const { id } = request.user;

    try {
        // Generate SQL statement
        const statement = 'SELECT cartitems.sku, cartitems.qty FROM cartitems INNER JOIN cart ON cartitems.cartid=cart.id WHERE cart.user_id = $1';
        const values = [id];

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(200).send(result.rows);

    } catch (err) {
        throw new Error(err)
    };
};

const addToCart = async (request, response) => {
    const { id } = request.user;
    const { sku, qty } = request.body;

    try {
        // Generate first SQL statement for cartId
        const statement = `SELECT users.id AS user, cart.id AS cartId 
                           FROM users INNER JOIN cart ON cart.user_id = users.id 
                           WHERE users.id = $1`;
        const values = [id];

        // Execute first SQL statement
        const cartId = await db.query(statement, values);

        // Generate 2nd SQL 
        const statement2 = `INSERT INTO cartitems (cartid, sku, qty) 
                            VALUES ($1, $2, $3)`;
        const values2 = [cartId.rows[0].cartid, sku, qty];

        // Execute 2nd SQL statement
        const result = await db.query(statement2, values2);

        return response.status(201).send(`${qty} x ${sku} added to cart`);

    } catch (err) {
        throw new Error(err)
    };
};


const checkout = async (request, response) => {

    const { id } = request.user;

    try {
        // Generate SQL statement
        const statement = 'SELECT cartitems.price, cartitems.qty FROM cartitems INNER JOIN cart ON cartitems.cartid=cart.id WHERE cart.user_id = $1';
        const values = [id];

        // Execute SQL statement
        const result = await db.query(statement, values);

        if (result.rows.length) {
            const totalPriceArr = result.rows.map(item => item.price * item.qty);
            const orderTotal = totalPriceArr.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            );

            const order = await createOrder(id, orderTotal);

            return response.status(200).send(`Your order summary is ${order}`);
        }

        return response.status(404).send('No cart to checkout');

    } catch (err) {
        throw new Error(err)
    };
}

module.exports = {
    getCartById,
    createCart,
    addToCart,
    checkout
};