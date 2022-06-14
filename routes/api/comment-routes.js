const router = require('express').Router();

// import destructured methods from exported controller script
const { addComment, removeComment } = require('../../controllers/comment-controller');

// set up POST - /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// set up DELETE - /api/comments/<pizzaId>/<commentId>
// two parameters needed to delete a comment because after deleting a particular comment
// you need to know exactly which pizza that comment originated from
router.route('/:pizzaId/:commentId').delete(removeComment);

// export
module.exports = router;