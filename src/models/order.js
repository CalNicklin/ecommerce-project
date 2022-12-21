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
            const { rows } = await db.query(`SELECT cartitems.sku, cartitems.qty AS quantity
            FROM cartitems INNER JOIN cart 
            ON cartitems.cartid=cart.id 
            WHERE cart.user_id = $1`, [id]);

            // data input values:
            const ordersItemsArr = rows.map(obj => ({ ...obj, order_id: orderId }));
            const cs = new pgp.helpers.ColumnSet(['sku', 'quantity', 'order_id'], { table: 'orders_items' });

            // generating a multi-row insert query:
            const statement2 = pgp.helpers.insert(ordersItemsArr, ['sku', 'quantity', 'order_id'], 'orders_items');
            
            const result = await db.query(statement2);

            if (result.rows.length) {
                return result.rows;
            };

            return null;

        } catch (err) {
            throw new Error(err)
        }

    } catch (err) {
        throw new Error(err);
    };
};

module.exports = {
    createOrder
};