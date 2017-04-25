const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const Post = require('./models/models').Post;


const should = chai.should();
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

describe('loading express', function () {
    let server;
    beforeEach(function () {
        server = require('./app').server;
    });
    afterEach(function () {
        server.close();
    });
    it('responds to GET /login', function testSlash(done) {
        chai.request(server)
            .get('/login')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('responds to POST /login', function testPostSlash(done) {
        chai.request(server)
            .post('/login')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('Getting posts', function () {
    let server;
    beforeEach(function (done) {
        server = require('./app').server;

        Post.collection.drop();

        new Post(
            {
                author: 'Batman',
                content: 'Test'
            }
        ).save(function (err) {
        }).then(done())
    });

    afterEach(function (done) {
        Post.collection.drop();
        done();
    });


    it('should get all posts GET', function (done) {
        chai.request(server)
            .get('/posts')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                console.log(res.body);
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('author');
                res.body[0].should.have.property('content');
                res.body[0].author.should.equal('Batman');
                res.body[0].content.should.equal('Test');
            }).then(done());
    })
});