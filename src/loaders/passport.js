const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const createError = require('http-errors');
const { getUserByEmail } = require('../models/user');

module.exports = (app) => {

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // tell passport how to serialize the user
    passport.serializeUser((user, done) => {
        console.log('Inside serializeUser callback. User id is saved to the session file store here')
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('Inside DeserializeUser callback. User id is saved to the session file store here')
        done(null, { id });
    });

    // configure passport.js to use the local strategy
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                // Check if user exists
                const user = await getUserByEmail(email);

                // If no user found, reject
                if (!user) {
                    throw createError(401, 'Incorrect username or password');
                };

                // Check for matching passwords
                if (!bcrypt.compareSync(password, user.password)) {
                    throw createError(401, 'Incorrect username or password');
                };

                return done(null, user);

            } catch (err) {
                done(err);
            };
        }
    ));

    return passport;

};

