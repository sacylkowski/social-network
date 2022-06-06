const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select("-__v")
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: "No thought found with this id! "});
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id}, 
            body, 
            { new: true, runValidators: true })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.status(400).json(err));
    },
    // we aren't creating a reaction document, we're just updating an existing thought
    createReaction({ params, body }, res){
            Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: body } },
                    { new: true, runValidators: true }
                )
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbData => {
            if (!dbData) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }
            return User.findOneAndUpdate(
                { _id: params.id },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.json(err));
    },
    deleteReaction({ params }, res) {
       Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true, runValidators: true }
            )
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;