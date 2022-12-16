import { getUserByEmail } from '../models/user';
const createError = require('http-errors');

export const login = async (data) => {

    const { email, password } = data;

    try {
        // Check if user exists
        const user = await getUserByEmail(email);

        // If no user found, reject
        if (!user) {
            throw createError(401, 'Incorrect username or password');
        }

        // Check for matching passwords
        if (user.password !== password) {
            throw createError(401, 'Incorrect username or password');
        }

        return user;

    } catch (err) {
        throw createError(500, err);
    }

};