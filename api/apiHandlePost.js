const express  = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { registerUser, loginUser } = require('../controllers/user.controller');

router.post('/login', loginUser)


router.post('/signup', registerUser)


module.exports = router;