const mongoose = require('mongoose')
const { Schema } = mongoose

const blogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]
})

const BlogPost = mongoose.model('blogposts', blogPostSchema)

module.exports = BlogPost