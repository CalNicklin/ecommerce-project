const { response } = require('express');
const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

const createOrder = async (id, orderTotal) => {

    try {
        // Generate SQL statement
        const statement = `INSERT INTO orders (customer_id, total)
                           VALUES ($1, $2) RETURNING order_id`;
        const values = [id, orderTotal];

        // Execute SQL statement
        const result = await db.query(statement, values);
        const orderId = result.rows[0].order_id;

        try {
            const { rows } = await db.query(`SELECT cartitems.sku, cartitems.qty
            FROM cartitems INNER JOIN cart 
            ON cartitems.cartid=cart.id 
            WHERE cart.user_id = $1`, [id]);

            // data input values:
            const ordersItemsArr = rows.map(obj => ({ ...obj, order_id: orderId }));

            // generating a multi-row insert query:
            const statement = pgp.helpers.insert(ordersItemsArr, ['sku', 'qty', 'order_id'], 'orders_items') + ' RETURNING *';

            const result = await db.query(statement);

            if (result.rows.length) {

                // // Make charge to payment method (not required in this project)
                // const stripe = require('stripe')('sk_test_FOY6txFJqPQvJJQxJ8jpeLYQ');

                // const charge = await stripe.charges.create({
                //     amount: orderTotal,
                //     currency: 'usd',
                //     source: 1,
                //     description: 'Order Charge'
                // });

                // // On successful charge to payment method, update order status to COMPLETE
                const order = update(orderId, id);

                return JSON.stringify(result.rows);
            };

        } catch (err) {
            throw new Error(err)
        }

    } catch (err) {
        throw new Error(err);
    };
};

const update = async (orderId) => {
    try {

        // Column details can be taken from the data object:
        const status = { status: 'complete' }

        // // Generate SQL statement - using helper for dynamic parameter injection
        // const statement = pgp.helpers.insert(status, null, 'orders');

        // Generate SQL statement - using helper for dynamic parameter injection
        const condition = pgp.as.format('WHERE order_id = ${orderId} RETURNING *', { orderId });
        const statement = pgp.helpers.update(status, null, 'orders') + condition;

        // Execute SQL statment
        const result = await db.query(statement);

        if (result.rows?.length) {
            return result.rows[0];
        }

        return null;

    } catch (err) {
        throw new Error(err);
    };
};

const getOrders = async (request, response) => {
    const { id } = request.user;

    try {
        // Generate SQL statement
        const statement = `SELECT order_id
                       FROM orders
                       WHERE customer_id = $1`;
        const values = [id];

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(200).send(result.rows);

    } catch (err) {
        throw new Error(err);
    };
};

const getOrderById = async (request, response) => {
    const order_id = request.params.id;

    try {
        // Generate SQL statement
        const statement = `SELECT sku, qty FROM orders_items
        WHERE order_id = $1`;
        const values = [order_id];

        // Execute SQL statement
        const result = await db.query(statement, values);
        const rows = JSON.stringify(result.rows);

        return response.status(200).send(`Order ${order_id} Details: ${rows}`);

    } catch (err) {
        throw new Error(err);
    };
};

module.exports = {
    createOrder,
    update,
    getOrders,
    getOrderById
}