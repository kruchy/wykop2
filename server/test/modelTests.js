const chai = require('chai');
const User = require('../src/models/models').User;
const expect = require('chai').expect;

const should = chai.should();

describe('User', function () {
    it('should save user', function (done) {
        const user = new User({
            username: 'Bruce',
            password: 'pass',
            email: 'test@test.com'
        });
        user.validate(function (err) {
            expect(err).to.not.exist;
            done();
        })
    });
    it('should not save user with invalid email', function (done) {
        const user = new User({
            username: 'Bruce',
            password: 'pass',
            email: 'testtest.com'
        });
        user.validate(function (err) {
            expect(err).to.exist;
            expect(err.errors).to.exist;
            done();
        })
    });
    it('should not save user with invalid username', function (done) {
        const user = new User({
            username: 'Bruce.@1',
            password: 'pass',
            email: 'test@test.com'
        });
        user.validate(function (err) {
            expect(err).to.exist;
            expect(err.errors).to.exist;
            done();
        })
    })
});