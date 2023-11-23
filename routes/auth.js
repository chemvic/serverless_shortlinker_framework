const express = require('express');
const router =express.Router();
const ctrl =require('../controllers/auth/auth');

router.post('/sign-up', ctrl.register);
router.post('/sign-in', ctrl.login);

module.exports = router;