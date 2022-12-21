const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../models/user');
const router = express.Router();

module.exports = (app) => {

    app.use('/users', router);

    router.get('/users', getUsers);

    router.get('/users/:id', getUserById);

    router.put('/users/:id', updateUser);

    router.delete('/users/:id', deleteUser);
};