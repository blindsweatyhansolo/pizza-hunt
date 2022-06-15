// import models
const { Pizza } = require('../models');

// CONTROLLER FUNCTIONS FOR PIZZA CRUD METHODS
const pizzaController = {
    // get all pizzas [GET]
    getAllPizza(req, res) {
        // find() = find all
        // populate() method used to populate related data (comments)
        Pizza.find({})
        .populate({
            path: 'comments',
            // 'select' method indicates omission of the '__v' field (with the minus symbol) on return
            select: '-__v'
        })
        .select('-__v')
        // sort() method set to DESC sort via _id by using '-1'
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one pizza by id [GET]
    // destructure params from req: { params }
    getPizzaById({ params }, res) {
        // findOne()
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            // if no pizza found, send 404
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza with this id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create new pizza [POST]
    // destructure body from req: { body }
    createPizza({ body }, res) {
        // Mongoose's create() handles both mongoDB's insertOne() and insertMany()
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // update pizza by id [PUT]
    updatePizza({ params, body }, res) {
        // findOneAndUpdate() finds single document, updates it and returns the
        // updated document using { new: true }, without this it will return the
        // original document; unlike updateOne() / updateMany() which do not return them;
        // runValidators must be set to allow validation of new data
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza with this id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a pizza [DELETE]
    deletePizza({ params }, res) {
        // findOneAndDelete() finds single document and deletes it, provides more data
        // than its counterparts deleteOne() / deleteMany()
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza with this id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;