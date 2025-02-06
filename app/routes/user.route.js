const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const UserMiddleware = require('../middleware/user.middleware')

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.get('/list', UserMiddleware,  UserController.usersList)

module.exports = router;