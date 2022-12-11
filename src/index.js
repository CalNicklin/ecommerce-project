import 'dotenv/config';
import express from 'express';
import cors from 'cors';
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoints:
// /users
app.get('/users', db.getUsers);

// register
app.post('/register', db.createUser);
// curl -d '{"name":"Chloe N", "email":"chlo@cal.com", "password":"passw0rd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/1

// /users/:id
app.get('/users/:id', db.getUserById);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

// /login

// /products
app.get('/products', db.getProducts);

// /products/:sku
app.get('/products/:sku', db.getProductsBySku);

// POST /cart
app.post('/cart', db.createCart);

// POST /cart/{cartId}
app.post('/cart/items/:id', db.addToCartById);
// curl -d '{"sku":"MTQ440T103", "qty":"4"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cart/2

// GET /cart/{cartId}
app.get('/cart/:id', db.getCartById);


// /orders
// /orders/:id


app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`),
);