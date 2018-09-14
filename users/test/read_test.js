const assert = require('assert')
const User = require('../models/user')

describe('Reading Users', () => {
    let joe, mark, alex, zach

    beforeEach((done) => {
        alex = new User({ name: 'Alex' })
        joe = new User({ name: 'Joe Rogan' })
        mark = new User({ name: 'Mark' })
        zach = new User({ name: 'Zach' })
        Promise.all([alex.save(), mark.save(), zach.save(), joe.save()])
        .then(() => done())
    })

    it('Finds all Joe Rogans', (done) => {
        User.find({name: 'Joe Rogan'})
        .then((users) => {
            assert(users[0]._id.toString() === joe._id.toString())
            done()
        })
    })

    it('Finds Joe Rogan by _id', (done) => {
        User.findOne({ _id: joe._id})
        .then((user) => {
            assert(user.name === 'Joe Rogan')
            done()
        })
    })

    it('Can skip and limit the result set (pagination)', (done) => {
        // -Alex-, [Joe, Mark], -Zach-
        User.find({})
        .sort({ name: 1}) // if negative sorts in descending order
        .skip(1)
        .limit(2)
        .then((users) => {
            assert(users.length === 2)
            assert(users[0].name === 'Joe Rogan')
            assert(users[1].name === 'Mark')
            done()
        })
    })
})