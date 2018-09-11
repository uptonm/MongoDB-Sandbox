const assert = require('assert')
const User = require('../models/user')

describe('Creating records', () => {
    it('Saves a user', (done) => {
        const joe = new User({name: 'Joe Rogan'})
        joe.save()
        .then(() => {
            assert(!joe.isNew)
            done()
        })
    })
})