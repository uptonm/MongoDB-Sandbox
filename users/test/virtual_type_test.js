const assert = require('assert')
const User = require('../models/user')

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const joe = new User({
            name: 'Joe Rogan',
            posts: [{title: 'Post Title'}]
        })
        joe.save()
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            assert(joe.postCount === 1)
            done()
        })
    })
})