const assert = require('assert')
const User = require('../models/user')

describe('Updating records', () => {
    let joe

    beforeEach((done) => {
        joe = new User({name: 'Joe Rogan', likes: 0})
        joe.save()
        .then(() => done())
    })

    function assertName(operation, done) {
        operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1) // Check if there is a duplicate user entry
            assert(users[0].name === 'Modified') // Check to see if the entry name was updated
            done()
        })
    }

    it('Instance type using set and save', (done) => {
        joe.set('name', 'Modified')
        assertName(joe.save(), done)
    })

    // Used when we have a reference to an instance of a model i.e. joe seen above
    it('A model instance can update', (done) => {
        assertName(joe.updateOne({name: 'Modified'}) , done)
    })

    it('A model class can update', (done) => {
        assertName(User.updateOne({name: 'Joe Rogan'}, {name: 'Modified'}), done)
    })

    it('A model class can update one record', (done) => {
        assertName(User.findOneAndUpdate({name: 'Joe Rogan'}, {name: 'Modified'}), done)
    })

    it('A model class can find a record by id and update', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Modified'}), done)
    })

    // This test is no longer valid because the postCount is now a Virtual type
    it('Increment post count', (done) => {
        User.updateOne({name: 'Joe Rogan'}, {$inc: {likes: 10}}) // update:  { <modifier> : { <variable> : <modify by quantity> } }
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            assert(user.likes === 10)
            done()
        })
    })
})