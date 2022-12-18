require('dotenv').config();
// npm modules
const LocalStrategy = require('passport-local').Strategy;
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
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./models/user');
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
    (email, password, done) => {
        axios.get(`http://localhost:5000/users?email=${email}`)
            .then(res => {
                const user = res.data[0]
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                if (password != user.password) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                }
                return done(null, user);
            })
            .catch(error => done(error));
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    axios.get(`http://localhost:5000/users/${id}`)
        .then(res => done(null, res.data))
        .catch(error => done(error, false))
});

// passport.serializeUser(function (user, cb) {
//     process.nextTick(function () {
//         return cb(null, user.id);
//     });
// });

// passport.deserializeUser(function (id, cb) {
//     try {
//         // Generate SQL statment
//         const statement = `SELECT * FROM users WHERE id = $1`;
//         const values = [id];

//         // Execute SQL statement
//         const result = db.query(statement, values);

//         // return cb(null, user)

//     } catch (err) {
//         throw new Error(err);
//     };
// });

// create the server
const app = express();

// add & configure middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

// /register
app.post('/register', createUser);
// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"cal@cal.com", "password":"passw0rd"}' 

// /users
app.get('/users', getUsers);

// // /users/:id
app.get('/users/:id', getUserById);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);

// /login
// app.post('/login', passport.authenticate('local'), async (req, res, next) => {
//     try {
//         const { username, password } = req.body;

//         const response = await login({ email: username, password });

//         res.status(200).send(response)

//     } catch (err) {
//         next(err);
//     }
// });

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