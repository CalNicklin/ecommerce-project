require('dotenv').config();
// npm modules
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid').v4;

const db = require('./db-original');
const { login } = require('./services/AuthService');
const { getUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail } = require('./models/user');
const { getProducts, getProductsBySku } = require('./models/products');
const { createCart, addToCart, getCartById } = require('./models/cart');

const users = [
    { id: '2f24vvg', email: 'test@test.com', password: 'password' }
];

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    // async (username, password, done) => {
    //     try {
    //         const user = await login({ email: username, password });
    //         return done(null, user);
    //     } catch (err) {
    //         return done(err);
    //     }
    // }
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            // Check if user exists
            const user = await getUserByEmail(email);

            // If no user found, reject
            if (!user) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }

            // Check for matching passwords
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }

            return done(null, user);

        } catch (err) {
            done(err);
        };
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, { id });
});

// create the server
const app = express();

// add & configure middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function')
        console.log(`Request object sessionID from client: ${req.sessionID}`)
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// Endpoints

app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You hit home page!\n`)
});

app.post('/register', createUser);
// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"cal@cal.com", "password":"passw0rd"}' 

app.get('/users', getUsers);

app.get('/users/:id', getUserById);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);

app.get('/login', (req, res) => {
    console.log('Inside GET /login callback function')
    console.log(req.sessionID)
    res.send(`You got the login page!\n`)
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) { return res.send(info.message) }
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/authrequired');
        })
    })(req, res, next);
})

app.get('/authrequired', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
    } else {
        res.redirect('/')
    }
})


// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"cal@cal.com", "password":"passw0rd"}'

//  /logout
app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// /products
app.get('/products', getProducts);

// /products/:sku
app.get('/products/:sku', getProductsBySku);

// POST /cart
app.post('/cart', createCart);

// POST /cart/{cartId}
app.post('/cart/items/:cartid', addToCart);
// curl -d '{"sku":"MTQ440T103", "qty":"4"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cart/2

// GET /cart/{cartId}
app.get('/cart', getCartById);


// /orders
// /orders/:id


app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`),
);




// curl --data "username=cal@cal.com&password=passw0rd" http://localhost:3000/login