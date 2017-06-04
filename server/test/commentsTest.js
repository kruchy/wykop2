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


describe('Creating comments', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();

    });
    it('adds successfully new comment to post', function (done) {
        let user = createAndSaveUser();
        let post = createPostForUser(user);

        chai.request(server)
            .post('/comment/')
            .send({
                content: 'test',
                postId: post._id,
                token: require('../src/routes/login').createToken(user)
            })
            .end(function (err, res) {
                // console.log(res);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('comment');
                res.body.comment.should.have.property('content');
                res.body.comment.should.have.property('author');
                res.body.comment.author.should.have.property('username');
                res.body.comment.should.have.property('replies');
                done()
            });
    });
});

describe('Delete comment', function () {
    let server;
    beforeEach(function () {
        server = require('../app').server;
        clearDatabase();
    });
    afterEach(function () {
        clearDatabase();
        server.close();
    });
    it('removes successfully comment ', function (done) {
        let user = createAndSaveUser();
        let comment = createCommentForUser(user);
        let post = createPostForUser(user, [comment]);
        chai.request(server)
            .delete('/comment/')
            .send({
                commentId: comment._id,
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
    it('forbids to remove comment by not author', function (done) {
        let user = createAndSaveUser();
        let admin = createAdmin(false);
        let comment = createCommentForUser(user);
        chai.request(server)
            .delete('/comment/')
            .send({
                commentId: comment._id,
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