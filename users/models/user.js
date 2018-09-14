const mongoose = require('mongoose')
const { Schema } = mongoose
const postSchema = require('./post')

const userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) =>  name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    posts: [postSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogposts'
    }]
})

// Virtual Field, does not persist to database, performs function to calculate locally
userSchema.virtual('postCount').get(function() {
    return this.posts.length
})

// middleware: run on remove call
userSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogposts')
    // Go through BlogPost collection, if the _id is in Joe's list of blogPosts, delete it
    BlogPost.deleteOne({ _id: { $in: this.blogPosts }})
    .then(() => next())
})  

const User = mongoose.model('users', userSchema)

module.exports = User