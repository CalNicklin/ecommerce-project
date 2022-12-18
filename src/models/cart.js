const db = require('../db-original');
const moment = require('moment');

const createCart = async (request, response) => {
    const userId = request.user;
    const created = moment.utc().toISOString();
    const modified = created;

    try {

        // Generate SQL statement
        const statement = 'INSERT INTO cart (user_id, created_at, modified)  VALUES ($1, $2, $3)'
        const values = [userId, created, modified]

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(201).send(`Created cart for user with ID:${userId}`);

    } catch (err) {
        throw new Error(err)
    };
};

const addToCart = async (request, response) => {
    const cartId = request.params.cartid;
    const { sku, qty } = request.body;

    try {
        // Generate SQL statement
        const statement = 'INSERT INTO cartitems (cartid, sku, qty) VALUES ($1, $2, $3)';
        const values = [cartId, sku, qty];

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(201).send(`${qty} x ${sku} added to cart`);

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

module.exports = {
    getCartById,
    createCart,
    addToCart
};