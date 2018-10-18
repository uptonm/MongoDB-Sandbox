// Todo: Create Artist Model
const mongoose = require('mongoose')
const { Schema } = mongoose
const albumSchema = require('./album')

const artistSchema = new Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    website: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    albums: [albumSchema]
})

const Artist = mongoose.model('artists', artistSchema)

module.exports = Artist