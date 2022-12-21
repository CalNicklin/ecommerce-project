const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../models/user');
const router = express.Router();

module.exports = (app) => {

    app.use('/users', router);

    router.get('/', getUsers);

    router.get('/:id', getUserById);

    router.put('/:id', updateUser);

    router.delete('/:id', deleteUser);
};