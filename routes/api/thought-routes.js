const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

router

    .route("/")
    .get(getAllThoughts)

router

    .route("/:userId")
    .post(createThought);

router

    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router

    .route("/:id/reactions")
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;