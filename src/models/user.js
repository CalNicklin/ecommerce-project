const db = require('../db');

export const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};

export const getUserById = async (request, response) => {
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

export const createUser = async (request, response) => {
    const { name, email, password } = request.body;

    try {
        // Generate SQL statement
        const statement = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, password];

        // Execute SQL statement
        const result = await db.query(statement, values);

        return response.status(201).send(`User added with ID: ${result.rows[0].id}`);
        
    } catch (err) {
        throw new Error(err)
    };
};

export const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email, password } = request.body;

    db.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
        [name, email, password, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID:${id}`)
        }
    );
};

export const deleteUser = async (request, response) => {
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

export const getUserByEmail = async (email) => {
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