const router = require('express').Router();

// import destructured methods from exported controller script
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// set up GET all and POST - /api/pizzas
// this is the same as writing
// router.get('/', getCallbackFunction);
// router.post('/', postCallbackFunction);
// helps with abstraction for testing (Jest), and is simpler and cleaner!
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// set up GET one, PUT, and DELETE - /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

// export
module.exports = router;