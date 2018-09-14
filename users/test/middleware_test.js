const assert = require('assert')
const mongoose = require('mongoose')
const User = require('../models/user')
const BlogPost = require('../models/blogPost')

describe('Middleware', () => {
    let joe, blogPost

    beforeEach((done) => {
        joe = new User({name: 'Joe Rogan'})
        blogPost = new BlogPost({title: 'Hello World', content: 'message'})

        joe.blogPosts.push(blogPost)

        Promise.all([joe.save(), blogPost.save()])
        .then(() => done())
    })

    it('Users clean up dangling blogPosts on remove', (done) => {
        joe.remove()
        .then(() => BlogPost.countDocuments())
        .then((count) => {
            assert(count === 0)
            done()
        })
    })
})