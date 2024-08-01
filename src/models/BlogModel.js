/*** 
 * - Title
- Content
- User (posted by)
- Likes
- Image upload
- Category
- Audit history
    - user
    - timestap 
*/

const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String, // come back later and replace this with a Mongoose object ID
        required: true
    },
    likes: {
        type: [String] // Come back later and replace with a Mongoose object ID
    }
},
{
    timestamps: true
})