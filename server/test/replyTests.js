const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const utils = require('./testUtils');
const clearDatabase = utils.clearDatabase;
const createAndSaveUser = utils.createAndSaveUser;
const createPostForUser = utils.createPostForUser;
const createAdmin = utils.createAdmin;
const createCommentForUser = utils.createCommentForUser;

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';


describe('Creating replies to comments', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();

    });
    it('adds successfully new reply to comment', function (done) {
        let user = createAndSaveUser();
        let subComment = createCommentForUser(user);
        let mainComment = createCommentForUser(user);

        chai.request(server)
            .post('/reply/')
            .send({
                content: 'test',
                commentId: mainComment._id,
                token: require('../src/routes/login').createToken(user)
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('comment');
                res.body.comment.should.have.property('content');
                res.body.comment.should.have.property('author');
                res.body.comment.author.should.have.property('username');
                res.body.comment.should.have.property('replies');
                res.body.comment.replies[0].should.have.property('content');
                res.body.comment.replies[0].content.should.be.equal('test');
                res.body.comment.should.have.property('author');
                done()
            });
    });
});

describe('Delete reply', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();
    });
    it('removes successfully reply ', function (done) {
        let user = createAndSaveUser();
        let subComment = createCommentForUser(user);
        let mainComment = createCommentForUser(user,[subComment]);
        chai.request(server)
            .delete('/reply/')
            .send({
                commentId: subComment._id,
                token: require('../src/routes/login').createToken(user)
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                done()
            });
    });

});