const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

module.exports = (app) => {

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // configure passport.js to use the local strategy
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                // Check if user exists
                const user = await getUserByEmail(email);

                // If no user found, reject
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                };

                // Check for matching passwords
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Invalid credentials.\n' });
                };

                return done(null, user);

            } catch (err) {
                done(err);
            };
        }
    ));

    // tell passport how to serialize the user
    passport.serializeUser((user, done) => {
        console.log('Inside serializeUser callback. User id is saved to the session file store here')
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, { id });
    });

    return passport;

};

