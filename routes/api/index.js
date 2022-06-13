// integrate and package API routes into the server with prefixes
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// add '/pizzas' prefix to 'pizza-routes.js'
router.use('/pizzas', pizzaRoutes);

// export
module.exports = router;
