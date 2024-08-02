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
        type: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
        required: true
    },
    likes: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
    },
    headerImage: {
        type: String, // URL to the file/image storage provider
        required: true
    },
    tags: {
        type: [String], // ["life", "travel", "photography"]
        required: true
    },
    editHistory: {
        type: [Object],
        required: false
    }
},
{
    timestamps: true
})

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = {
    BlogModel
}