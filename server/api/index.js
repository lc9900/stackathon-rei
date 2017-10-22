const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
// router.use('/properties', require('./properties'));
