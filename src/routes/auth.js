const express = require('express');
const { createUser } = require('../models/user');
const router = express.Router();

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.post('/register', createUser);
    
    router.get('/login', (req, res) => {
        console.log('Inside GET /login callback function')
        console.log(req.sessionID)
        res.send(`You got the login page!\n`)
    });
    
    // curl http://localhost:3000/auth/login -c cookie-file.txt -H 'Content-Type: application/json' -d '{"email":"chlo@cal.com", "password":"passw0rd"}' -L
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (info) { return res.send(info.message) }
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.login(user, (err) => {
                if (err) { return next(err); }
                return res.redirect('/auth/authrequired');
            })
        })(req, res, next);
    });
    

    router.get('/authrequired', (req, res, next) => {
        res.send('You are in the authorised section')
    });

};