const db = require('../db');

const getUsers = async (request, response) => {
    await db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

const getUserById = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        // Generate SQL statment
        const statement = `SELECT * FROM users WHERE id = $1`;
        const values = [id];

        // Execute SQL statement
        const result = await db.query(statement, values);

        if (result.rows?.length) {
            response.status(200).send(result.rows)
        }

        return response.status(404).send(`No user found with ID: ${id}`)

    } catch (err) {
        throw new Error(err);
    };
};

const updateUser = async (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email, password } = request.body;

    try {
        // Generate SQL statement
        const statement = 'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4';
        const values = [name, email, password, id];

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(201).send(`User modified with ID:${id}`);

    } catch (err) {
        throw new Error(err);
    };
};

const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        // Generate SQL statement
        const statement = 'DELETE FROM users WHERE id = $1';
        const values = [id];

        // Execute SQL statement
        const result = await db.query(statement, values);

        response.status(200).send(`User deleted with ID:${id}`);

    } catch (err) {
        throw new Error(err);
    };
};

const getUserByEmail = async (email) => {
    try {

        // Generate SQL statement
        const statement = `SELECT *
                         FROM users
                         WHERE email = $1`;
        const values = [email];

        // Execute SQL statment
        const result = await db.query(statement, values);

        if (result.rows?.length) {
            return result.rows[0]
        }

        return null;

    } catch (err) {
        throw new Error(err);
    }
};

const getUserByFbID = async (id) => {
    try {

        // Generate SQL statement
        const statement = `SELECT *
                           FROM users
                           WHERE facebook ->> 'id' = $1`
        const values = [id];

        // Execute SQL statment
        const result = await db.query(statement, values);

        if (result.rows?.length) {
            return result.rows[0]
        }

        return null;

    } catch (err) {
        throw new Error(err);
    }
};


module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserByFbID
};