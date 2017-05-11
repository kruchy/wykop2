const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const utils = require('./testUtils');
const clearDatabase = utils.clearDatabase;
const createAndSaveUser = utils.createAndSaveUser;

const createAdmin = utils.createAdmin;

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

describe('Granting admin', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();

    });
    it('grants user admin privileges', function (done) {

        let admin = createAdmin(true);
        createAndSaveUser();
        chai.request(server)
            .put('/admin/')
            .send({
                username: 'Bruce',
                token: require('../src/routes/login').createToken(admin)
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('message');
                res.body.message.should.have.property('username');
                res.body.message.username.should.be.equal('Bruce');
                res.body.message.should.have.property('admin');
                res.body.message.admin.should.be.equal(true);


                done()
            });
    });
    it('fails to grant admin when requester is not an admin', function (done) {
        let admin = createAdmin(false);


        createAndSaveUser();
        chai.request(server)
            .put('/admin/')
            .send({
                username: 'Bruce',
                token: require('../src/routes/login').createToken(admin)
            })
            .end(function (err, res) {
                res.should.have.status(403);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(false);
                done()
            });
    });
    it('revokes admin from user', function (done) {

        let admin = createAdmin(true);

        createAndSaveUser();
        chai.request(server)
            .delete('/admin/')
            .send({
                username: 'Bruce',
                token: require('../src/routes/login').createToken(admin)
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('message');
                res.body.message.should.have.property('username');
                res.body.message.username.should.be.equal('Bruce');
                res.body.message.should.have.property('admin');
                res.body.message.admin.should.be.equal(false);


                done()
            });
    });
    it('fails to revoke admin from user when requester is not an admin', function (done) {
        let admin = createAdmin(false);
        createAndSaveUser();
        chai.request(server)
            .delete('/admin/')
            .send({
                username: 'Bruce',
                token: require('../src/routes/login').createToken(admin)
            })
            .end(function (err, res) {
                res.should.have.status(403);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(false);
                done()
            });
    });
});