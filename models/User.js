// importing the Schema constructor and model function
const { Schema, model } = require("mongoose");

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
        // Regex to valid email
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            // getters: true
        },
        id: false
    }
);

// get total count of friends
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;