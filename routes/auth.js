const express = require('express');
const router = express.Router();
const { signUpUser, loginUser, refreshToken } = require('./authConfig');



router.post('/login',loginUser)

router.post('/signup', signUpUser)

router.get('/refreshtoken', refreshToken)


module.exports = router;