const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
});

// User Endpoints \\
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const createUser = (request, response) => {
    const { name, email, password } = request.body;

    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email, password } = request.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
        [name, email, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID:${id}`)
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        'DELETE FROM users WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID:${id}`)
        }
    );
};

// End user endpoints \\
// Products endoints \\

const getProducts = (request, response) => {
    pool.query('SELECT * FROM products ORDER BY product_name ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const getProductsBySku = (request, response) => {
    const sku = request.params.sku;

    pool.query('SELECT * FROM products WHERE sku = $1', [sku], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getProducts,
    getProductsBySku
};