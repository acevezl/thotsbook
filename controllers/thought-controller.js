const { Thought, User } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get thoughts by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // add thought
    addThought({params, body}, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$push: { thoughts: _id}},
                    {new: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message:'No user found with that id, cannot add thought'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // update thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            body,
            {new:true, runValidators:true}
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message:'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // remove thought
    removeThought({params}, res){
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({message: 'No thought found with this id, nothing to remove'});
                    return;
                }
                
                return User.findOneAndUpdate(
                    {username: deletedThought.username},
                    {$pull: {thoughts: params.thoughtId}},
                    {new: true}
                    )
                    .populate({
                        path: 'thoughts',
                        select: '-__v'
                    });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                return res.json(dbUserData);
            })
            .catch(err => res.json(err));      
    },

    // add reaction
    addReaction({body, params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id, cannot add reaction'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));

    },

    // remove reaction
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: { reactionId: params.reactionId}}},
            {new: true, runValidators:true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id, cannot add reaction'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));

    }
}

module.exports = thoughtController;