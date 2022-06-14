// import models
const { Comment, Pizza } = require('../models');

// CONTROLLER FUNCTIONS FOR COMMENT CRUD METHODS
const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    // $push method adds (push to array) comment's _id to the specific pizza being updated
                    // all MongoDB-based functions start with dollar sign $
                    { $push: { comments: _id } },
                    // { new: true } option returns the updated pizza data (with new comment included)
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with id' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    // add reply to comment
    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } },
            { new: true }
        )
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },
    
    // remove comment
    removeComment({ params }, res) {
        // findOneAndDelete() deletes document while also returning its data
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment found with id' });
                }
                // use data from findOneAndDelete() to identify and remove it from associated
                // pizza using $pull (pull from array)
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } },
                    // return updated data without comment's _id in pizza's comments array
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with id' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));

    },
    
    // remove a reply
    removeReply({ params }, res) {
        Comment.findByIdAndUpdate(
            { _id: params.commentId },
            // $pull specific reply from replies array where replyId matches passed params.replyId
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err));
    }
};

// export
module.exports = commentController;