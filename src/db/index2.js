// const { request, response, application } = require('express');
// const moment = require('moment');
// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DB,
//     password: process.env.PASSWORD,
//     port: process.env.DBPORT,
// });

// // ***** MAKE THESE MODULAR *****

// // Login Endpoint \\


// // User Endpoints \\


// // End user endpoints \\
// // Products endoints \\

// const getProducts = (request, response) => {
//     pool.query('SELECT * FROM products ORDER BY product_name ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     });
// };

// const getProductsBySku = (request, response) => {
//     const sku = request.params.sku;

//     pool.query('SELECT * FROM products WHERE sku = $1', [sku], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     });
// };

// // End products endpoints \\

// // Cart Endpoints \\
// // POST /cart
// const createCart = (request, response) => {
//     const userId = request.user;
//     // INSTALL PASSPORT MIDDLEWARE TO CREATE REQ.USER
//     const created = moment.utc().toISOString();
//     const modified = moment.utc().toISOString();

//     pool.query('INSERT INTO cart (user_id, created_at, modified) VALUES ($1, $2, $3)', [userId, created, modified], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).json(results.rows)
//     });
// };

// // POST /cart/{cartId}
// const addToCartById = (request, response) => {
//     const cartid = request.params.id;
//     const { sku, qty } = request.body;

//     pool.query('INSERT INTO cartitems (cartid, sku, qty) VALUES ($1, $2, $3)', [cartid, sku, qty], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).json(results.rows)
//     });
// };

// // GET /cart/{cartId}
// const getCartById = (request, response) => {
//     const id = request.params.id;

//     pool.query('SELECT * FROM cartitems WHERE cartid = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     });
// };

// module.exports = {
//     getUsers,
//     getUserById,
//     getUserByEmail,
//     createUser,
//     updateUser,
//     deleteUser,
//     getProducts,
//     getProductsBySku,
//     getCartById,
//     addToCartById,
//     createCart
// };

// // curl -X POST http://localhost:3000/login -H 'Content-Type: application/json' -d '{'email': 'cal@cal.com'}'