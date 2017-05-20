const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const utils = require('./testUtils');
const clearDatabase = utils.clearDatabase;
const createAndSaveUser = utils.createAndSaveUser;

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

describe('Login tests', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();

    });
    it('returns 200 and valid token when correct credentials used', function (done) {
        createAndSaveUser();
        chai.request(server)
            .post('/login')
            .auth('Bruce', 'test')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('token');
                res.body.should.have.property('user');
                res.body.user.username.should.be.equal('Bruce');
                done()
            });
    });
    it('returns unauthorized when invalid credentials used', function (done) {
        createAndSaveUser();
        chai.request(server)
            .post('/login')
            .auth('Bruce', 'other')
            .end(function (err, res) {
                res.should.have.status(401);
                done()
            });
    });
    it('fails gracefully when user is not found', function (done) {
        chai.request(server)
            .post('/login')
            .auth('Bruce', 'test')
            .end(function (err, res) {
                res.should.have.status(401);
                done()
            });
    });
});



