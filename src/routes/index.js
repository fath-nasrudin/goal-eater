const router = require('express').Router();

router.use('/goals', require('./goal.routes'));

module.exports = router;
