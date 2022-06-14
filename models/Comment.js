// import mongoose dependencies
const { Schema, model } = require('mongoose');

// schema set up using mongoose's Schema constructor
const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// create Comment model using CommentSchema
const Comment = model('Comment', CommentSchema);

// export Comment model
module.exports = Comment;