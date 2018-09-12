const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    content: String, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment