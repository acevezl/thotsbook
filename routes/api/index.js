const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix /user and /thoughts to route requests
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;