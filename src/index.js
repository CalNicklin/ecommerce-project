require('dotenv').config();
const express = require('express');
const app = express();

const loaders = require('./loaders');

const startServer = async () => {

    // Init app loaders
    loaders(app);

    // Starts server
    app.listen(process.env.PORT, () =>
        console.log(`Listening on port ${process.env.PORT}!`),
    );
};

startServer();

// curl --data "username=cal@cal.com&password=passw0rd" http://localhost:3000/login