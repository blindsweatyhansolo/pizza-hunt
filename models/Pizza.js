// import Mongoose dependencies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// schema set up using mongoose's Schema constructor
const PizzaSchema = new Schema(
    {
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        // current date as default
        default: Date.now,
        // getter (get) is a special type of function that takes stored data and modifies
        // on return, like middleware; creates a variable called createdAtVal and passes
        // it to the dateFormat() function in /utils
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    // empty brackets '[]' indicates array as the data type
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
    },
    {
        toJSON: {
            // schema option to allow for use of virtuals and getters
            virtuals: true,
            getters: true
        },
        // id set to false because this is a virtual that mongoose returns but isn't needed
        id: false
    }
);

// VIRTUAL - get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export Pizza model
module.exports = Pizza;