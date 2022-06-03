const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../../controllers/user-controller");

router

.route("/")
.get(getAllUsers)
.get(getUserById)
.post(createUser)
.put(updateUser)
.delete(deleteUser);

router

.route("/:userId/friends/:friendId")
.post(createFriend)
.delete(deleteFriend);

module.exports = router;