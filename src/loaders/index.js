const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger');

module.exports = async (app) => {

    // Load express middleware
    const expressApp = await expressLoader(app);

    // Load passport authentication middleware
    const passport = await passportLoader(expressApp);

    // Load API route handlers
    await routeLoader(app, passport);

    // Load Swagger
    await swaggerLoader(app);

};