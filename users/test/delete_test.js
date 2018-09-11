const assert = require('assert')
const User = require('../models/user')

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe Rogan'})
        joe.save()
        .then(() => done())
    })

    function assertName(operation, done) {
        operation
        .then(() => User.findOne({name: 'Joe Rogan'}))
            .then((user) => {
                assert(user === null)
                done()
            })
    }

    it('Model instance remove', (done) => {
        // Already have user i.e. the joe variable above
        assertName(joe.remove(), done)
    })

    it('Class method remove', (done) => {
        assertName(User.deleteOne({name: 'Joe Rogan'}), done) // Collection.delete is depreciated, use deleteOne or deleteMany => We know that there will only be one entry per test so either works
    })

    it('Class method findAndRemove', (done) => {
        assertName(User.findOneAndDelete({name: 'Joe Rogan'}), done)
    })

    it('Class method findByIdAndRemove', (done) => {
        assertName(User.findByIdAndDelete(joe._id), done)
    })
})