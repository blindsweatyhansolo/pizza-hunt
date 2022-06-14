// integrate and package API routes into the server with prefixes
const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

// add '/comments' prefix to 'comment-routes.js'
router.use('/comments', commentRoutes);
// add '/pizzas' prefix to 'pizza-routes.js'
router.use('/pizzas', pizzaRoutes);

// export
module.exports = router;
