const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const utils = require('./testUtils');
const clearDatabase = utils.clearDatabase;
const createAndSaveUser = utils.createAndSaveUser;
const createUserWithPost = utils.createUserWithPost;

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

describe('Getting posts', function () {
    let server;
    beforeEach(function (done) {
        server = require('../app').server;
        clearDatabase();
        createUserWithPost(done);
    });

    afterEach(function (done) {
        clearDatabase();
        server.close();
        done();
    });

    it('Should get all posts GET', function (done) {
        chai.request(server)
            .get('/posts')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('posts');
                res.body.posts[0].should.have.property('_id');
                res.body.posts[0].should.have.property('author');
                res.body.posts[0].should.have.property('content');
                res.body.posts[0].author.should.have.property('username');
                res.body.posts[0].author.username.should.equal('Bruce');
                res.body.posts[0].content.should.equal('Test');
                done();
            });
    });

    it('Should get user from GET', function (done) {
        chai.request(server)
            .get('/user')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('users');
                res.body.users[0].should.have.property('_id');
                res.body.users[0].should.have.property('username');
                res.body.users[0].should.have.property('email');
                res.body.users[0].username.should.equal('Bruce');
                res.body.users[0].email.should.equal('brucewayne@test.com');
                done();
            });
    });
});

describe('Creating posts', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();

    });
    it('adds successfully new post ', function (done) {
        let user = createAndSaveUser();
        chai.request(server)
            .post('/posts/')
            .send({
                author: user,
                content: 'test',
                token: require('../src/routes/login').createToken(user)
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('post');
                res.body.post.content.should.be.equal('test');
                res.body.should.have.property('author');
                res.body.author.username.should.be.equal('Bruce');

                done()
            });
    });
    it('fails gracefully when token is incorrect', function (done) {
        let user = createAndSaveUser();
        chai.request(server)
            .post('/posts/')
            .send({
                author: user,
                content: 'Test',
                token: "abc"
            })
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
});