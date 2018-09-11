const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) =>  name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required']
    },
    postCount: Number
})

const User = mongoose.model('users', userSchema)

module.exports = User