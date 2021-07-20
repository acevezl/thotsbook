const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require ('../../controllers/user-controller');

// /api/users/
// get all users
// create user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:<user_id>
// get user by id
// update user
// delete user
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/<user_id>/friends/<friend_id>
// add a friend
// remove a friend
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .put(removeFriend);

module.exports = router;