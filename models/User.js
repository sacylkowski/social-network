// importing the Schema constructor and model function
const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    friends: [],

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// get total count of friends
UserSchema.virtual("friendCount").get(function () {
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});

const User = model("User", UserSchema);

module.exports = User;