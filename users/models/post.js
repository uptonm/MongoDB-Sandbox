const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    title: String,
    body: String
})

mongoose.model('post', postSchema)

module.exports = postSchema