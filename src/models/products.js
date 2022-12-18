const db = require('../db-original');

const getProducts = async (request, response) => {
    await db.query('SELECT * FROM products ORDER BY sku ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const getProductsBySku = async (request, response) => {
    const sku = request.params.sku;

    try {
        // Generate SQL statement
        const statement = 'SELECT * FROM products WHERE sku = $1';
        const values = [sku];

        // Execute SQL statement
        const result = await db.query(statement, values);

        if (result.rows?.length) {
            response.status(200).send(result.rows);
        }

        return response.status(404).send(`No products found with SKU:${sku}`);
    
    } catch (err) {
        throw new Error(err);
    };
};

module.exports = {
    getProducts,
    getProductsBySku,
};

