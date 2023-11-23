const express = require('express');
const {getMe} = require('../controllers/user/getMe');
const authenticate = require('../middleware/authenticate');

const router =express.Router();



router.get('/me', authenticate, getMe);

  module.exports = router;