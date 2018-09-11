const assert = require('assert')
const User = require('../models/user')

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe Rogan'})
        joe.save()
        .then(() => done())
    })

    it('Model instance remove', (done) => {
        // Already have user i.e. the joe variable above
        joe.remove()
            .then(() => User.findOne({name: 'Joe Rogan'}))
            .then((user) => {
                assert(user === null)
                done()
            })
    })

    it('Class method remove', (done) => {
        User.deleteOne({name: 'Joe Rogan'}) // Collection.delete is depreciated, use deleteOne or deleteMany => We know that there will only be one entry per test so either works
        .then(() => User.findOne({name: 'Joe Rogan'}))
            .then((user) => {
                assert(user === null)
                done()
            })
    })

    it('Class method findAndRemove', (done) => {
        User.findOneAndDelete({name: 'Joe Rogan'})
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            assert(user === null)
            done()
        })
    })

    it('Class method findByIdAndRemove', (done) => {
        User.findByIdAndDelete(joe._id)
        .then(() => User.findOne({name: 'Joe Rogan'}))
        .then((user) => {
            assert(user === null)
            done()
        })
    })
})