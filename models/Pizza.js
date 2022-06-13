// import Mongoose dependencies
const { Schema, model } = require('mongoose');

// schema set up using mongoose's Schema constructor
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        // current date as default
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    // empty brackets '[]' indicates array as the data type
    toppings: []
});

// create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export Pizza model
module.exports = Pizza;