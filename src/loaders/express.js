const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid').v4;

module.exports = (app) => {

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(
        cors({
            origin: "http://localhost:3000",
            methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
            credentials: true,
        })
    );

    // Transforms raw string of req.body into JSON
    app.use(bodyParser.json());

    // Parses urlencoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    // Creates session
    app.use(session({
        genid: (req) => {
            console.log('Inside session middleware genid function')
            console.log(`Request object sessionID from client: ${req.sessionID}`)
            return uuid() // use UUIDs for session IDs
        },
        store: new FileStore(),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: false,
            secure: true,
            maxAge: 1000,
            httpOnly: true,
        },
    }));

    return app;
};