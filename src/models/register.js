const db = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async (request, response) => {

    const { name, email, password } = request.body;

    const hash = await bcrypt.hash(password, 10);
 
    try {
        // query statement to store hash
        const statement = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';

        // salt, hash, and store
        const values = [name, email, hash];

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(201).send(`User added with ID: ${result.rows[0].id}`);
    } catch (err) {
        throw new Error(err);
    };
};

module.exports = {
    createUser
}


