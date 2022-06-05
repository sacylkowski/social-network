// Reaction schema as a subdocument of Thought

const { Schema, model, Types } = require("mongoose");
// requiring moment for date format
const moment = require("moment");

const ReactionSchema = new Schema({
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMMM Do YYYY, h:mm:ss a")
    }
},
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMMM Do YYYY, h:mm:ss a")
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

// get total count of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;