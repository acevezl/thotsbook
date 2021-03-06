const { User } = require('../models');

const userController = {

    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json({message: err.message}));
    },

    // get user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with that id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json({message: err.message}));
            
    },

    // create user
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json({message: err.message}));
    },

    // update user
    updateUser({params,body}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new:true, runValidators:true}
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id'})
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json({message: err.message}));
    },

    // delete user
    deleteUser({params}, res){
        User.findOneAndDelete(
                {_id: params.id}
            )
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json({message: err.message}));
    },

    // add friend
    addFriend({params, body}, res) {
        User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {friends: body.friendId}},
                {new: true, runValidators: true}
            )
            .then(dbUserData => {
                console.log('updating...');
                if (!dbUserData) {
                    res.status(404).json({message: "No user found with this id"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json({message: err.message}));
    },

    // remove friend
    removeFriend({params}, res) {
        User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {friends:params.friendId}},
                {new: true, runValidators: true}
            )
            .then(dbUserData => {
                console.log('deleting...');
                if (!dbUserData) {
                    res.status(404).json({message: "No user found with this id"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json({message: err.message}));
    }
    
}

module.exports = userController;