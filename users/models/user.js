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

userSchema.virtual('postCount').get(function() {
    return this.posts.length
})


const User = mongoose.model('users', userSchema)

module.exports = User