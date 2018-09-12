const assert = require('assert')
const User = require('../models/user')
const BlogPost = require('../models/blogPost')
const Comment = require('../models/comment')

describe('Associations', () => {
    let joe, blogPost, comment
    beforeEach((done) => {
        joe = new User({name: 'Joe Rogan'})
        blogPost = new BlogPost({title: 'Hello World', content: 'message'})
        comment = new Comment({content: 'Hello Blog Post'})

        joe.blogPosts.push(blogPost)
        blogPost.comments.push(comment)
        comment.user = joe

        Promise.all([joe.save(), blogPost.save(), comment.save()])
        .then(() => done())
    })

    it('Relationship between user and a blogPost', (done) => {
        User.findOne({name: 'Joe Rogan'})
        .populate('blogPosts')
        .then((user) => {
            assert(user.blogPosts[0].title === 'Hello World')
            done()
        })
    })

    it('Saves a full relation graph', (done) => {
        User.findOne({name: 'Joe Rogan'})
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comments',
                populate: {
                    path: 'user', // Path represents the field it goes into
                    model: 'users' // Model represents the Schema it derives the document from the objectId by
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Joe Rogan')
            assert(user.blogPosts[0].title === 'Hello World')
            assert(user.blogPosts[0].comments[0].content === 'Hello Blog Post')
            assert(user.blogPosts[0].comments[0].user.name === 'Joe Rogan')
            done()
        })
    })
})