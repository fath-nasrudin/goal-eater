const router = require('express').Router();

router.use('/goals', require('./goal.routes'));
router.use('/users', require('./user.routes'));

module.exports = router;
