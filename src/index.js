require('dotenv').config();
const express = require('express');
const { request, response, application } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const session = require('express-session');
const store = new session.MemoryStore();
const passport = require('passport');
const { login } = require('./services/AuthService');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(
    session({
        secret: process.env.SECRET,
        cookie: { maxAge: 300000000, secure: false },
        saveUninitialized: false,
        resave: false,
        store
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await login({ email: username, password });
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    getUserById(id, function (err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoints:
// /register
app.post('/register', createUser);
// curl -d '{"name":"Chloe N", "email":"chlo@cal.com", "password":"passw0rd"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users/1

// /users
app.get('/users', getUsers);

// // /users/:id
app.get('/users/:id', getUserById);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);

// /login
app.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const response = await login({ email: username, password });

        res.status(200).send(response);
    } catch (err) {
        next(err);
    }
});

//  /logout
app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
  

// /products
// app.get('/products', db.getProducts);

// // /products/:sku
// app.get('/products/:sku', db.getProductsBySku);

// // POST /cart
// app.post('/cart', db.createCart);

// // POST /cart/{cartId}
// app.post('/cart/items/:id', db.addToCartById);
// // curl -d '{"sku":"MTQ440T103", "qty":"4"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cart/2

// // GET /cart/{cartId}
// app.get('/cart/:id', db.getCartById);


// /orders
// /orders/:id


app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`),
);




// curl --data "username=cal@cal.com&password=p4ssw0rd" http://localhost:3000/login