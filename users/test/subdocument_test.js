const assert = require('assert')
const User = require('../models/user')

describe('Subdocuments', () => {
    it('Can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe Rogan', 
            posts: [{title: 'Hello World'}]
        })
        joe.save()
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            assert(user.posts[0].title === 'Hello World')
            done()
        })
    })

    it('Can add subdocuments to existing record', (done) => {
        const joe = new User({
            name: 'Joe Rogan',
            posts: []
        })
        joe.save()
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            user.posts.push({ title: 'New Post'})
            return user.save()
        })
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            assert(user.posts[0].title === 'New Post')
            done()
        })
    })

    it('Can remove existing subdocument', (done) => {
        const joe = new User({
            name: 'Joe Rogan',
            posts: [{title: 'New Post'}]
        })
        joe.save()
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user => {
            const post = user.posts[0]
            post.remove()
            return user.save()
        }))
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            assert(user.posts.length === 0)
            done()
        })
    })
})