const assert = require('assert')
const User = require('../models/user')

describe('Reading Users', () => {
    let joe

    beforeEach((done) => {
        joe = new User({ name: 'Joe Rogan' })
        joe.save()
        .then(() => done())
    })

    it('Finds all Joe Rogans', (done) => {
        User.find({name: 'Joe Rogan'})
        .then((users) => {
            assert(users[0]._id.toString() === joe._id.toString())
            done()
        })
    })
})