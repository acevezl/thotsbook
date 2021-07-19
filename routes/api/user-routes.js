const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require ('../../controllers/user-controller');

// get all users
// create user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// get user by id
// update user
// delete user

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(delteUser);

module.exports = router;