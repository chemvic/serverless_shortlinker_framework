const express = require('express');
const router =express.Router();
const ctrl =require('../controllers/links/linker');
const authenticate = require('../middleware/authenticate');


router.post('/shortLink', authenticate, ctrl.makeShort );

router.get('/list', authenticate, ctrl.showAllLinks);
router.get('/:shortCode',  ctrl.reroute);
module.exports = router;