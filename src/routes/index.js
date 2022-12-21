const userRouter = require('./user');
const productsRouter = require('./products');
const cartRouter = require('./cart');
const orderRouter = require('./orders');
const authRouter = require('./auth');

module.exports = (app, passport) => {
    userRouter(app),
    productsRouter(app),
    cartRouter(app),
    orderRouter(app),
    authRouter(app, passport)

    app.get('/', (req, res) => {
        res.status(200).send(`You hit home page!\n`)
    });

    app.post('/logout', function (req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
};