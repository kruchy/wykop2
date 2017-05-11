const chai = require('chai');
const chaiHttp = require('chai-http');
const utils = require('./testUtils');
const clearDatabase = utils.clearDatabase;

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
describe('Registration tests', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();

    });
    it('successfully register new user', function (done) {
        chai.request(server)
            .post('/register/')
            .send({
                username: 'Bruce',
                password: 'test',
                email: 'test@test.com'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                done()
            });
    });
    it('Fails register new user due to invalid data', function (done) {
        chai.request(server)
            .post('/register/')
            .send({
                username: 'Bruce',
                password: null,
                email: 'test@test.com'
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(false);
                done()
            });
    })
});