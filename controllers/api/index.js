const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/review', commentRoutes);

module.exports = router;

