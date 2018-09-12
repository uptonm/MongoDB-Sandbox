const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
    mongoose.connect('mongodb://localhost/users_test',{ useNewUrlParser: true })
    mongoose.connection
    .once('open', () => {done()})
    .on('error', (error) => {
        console.warn('Error', error)
    })
    mongoose.set('useFindAndModify', false)
})

beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done()
            })
        })
    })
})