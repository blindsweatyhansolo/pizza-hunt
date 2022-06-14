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
        get: createdAtVal => dateFormat(createdAtVal)
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
        // IMPORTANT! also prevents creation of second id!
        id: false
    }
);

// VIRTUAL - get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    // return this.comments.length;

    // reduce() executes a function on each element in an array like map(), but
    // uses the result of each function execution for each successive computation as it
    // goes through the array, perfect for getting a sum of multiple values
    // takes two params: accumulator (total) and a currentValue (comment)
    // tallies up the total of every comment with it's replies
    return this.comments.reduce(
        (total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export Pizza model
module.exports = Pizza;