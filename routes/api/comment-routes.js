const router = require('express').Router();

// import destructured methods from exported controller script
const { 
  addComment, 
  removeComment,
  addReply,
  removeReply
} = require('../../controllers/comment-controller');

// set up POST - /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// set up DELETE - /api/comments/<pizzaId>/<commentId>
// two parameters needed to delete a comment because after deleting a particular comment
// you need to know exactly which pizza that comment originated from
router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment);

// set up DELETE REPLY - /api/<pizzaId>/<commentId>/<replyId>
// "Go to this pizza, then look at this particular comment, then delete this one reply."
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);
// export
module.exports = router;