// import mongoose dependencies
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// schema set up for replies
const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()  
        },
        replyBody: {
            type: String
        },
        writtenBy: {
            type: String
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// schema set up using mongoose's Schema constructor
const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String
        },
        commentBody: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // associate replies with comments, replies field populated with array of data
        // that adheres to ReplySchema definition
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // IMPORTANT! also prevents creation of second id!
        id: false
    }
);

// VIRTUAL - get total reply count on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

// create Comment model using CommentSchema
const Comment = model('Comment', CommentSchema);

// export Comment model
module.exports = Comment;