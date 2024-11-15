const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create-user', UserController.createUser);

module.exports = router;
