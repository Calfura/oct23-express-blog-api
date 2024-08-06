/*
- username
- blog post view history
*/

const mongoose = require("mongoose");
const { commentSchema } = require("./CommentModel");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    viewHistory: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref:"Blog"}],
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
    // comments: {
    //     // These are NOT the same comments as what the Blogs contain, they just  reuse the commentSchema
    //     types: [commentSchema]
    // }
});

userSchema.pre(
    "save",
    async function (next) {
        const user = this;
        console.log("Pre-save hook running...")

        if (!user.isModified("password")){
            return;
        } 

        console.log("Pre-save hook running and password is modified!")
        // If we reach this line of code, the password is modified
        // and thus is not encrpted!
        // we must encrypt it!

        // TODO: encryption



        next();
    }
)

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}