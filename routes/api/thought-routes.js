const router = require('express').Router();
const { 
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require ('../../controllers/thought-controller');

// /api/thoughts/
// get all thoughts
router
    .route('/')
    .get(getAllThoughts)

// add thought
router
    .route('/:userId')
    .post(addThought);

// /api/thoughts/<thought_id>
// get thought by Id
// update thought
// delete thought
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/<thought_id>/reactions
// add reaction
router
    .route('/:thoughtId/reactions')
    .put(addReaction);

// /api/thoughts/<thought_id>/reactions/<reaction_id>
// remove reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;