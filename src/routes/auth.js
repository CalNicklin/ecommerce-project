const express = require('express');
const { createUser } = require('../models/user');
const { login } = require('../services/login');
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
    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const { email, password } = req.body;
          
            const response = await login({ email: email, password});
          
            res.status(200).send(response);
          } catch(err) {
            next(err);
          }
    });
    

    router.get('/authrequired', (req, res, next) => {
        res.status(200).send('You are in the authorised section')
    });

};