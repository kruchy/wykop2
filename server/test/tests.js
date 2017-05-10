const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const Post = require('../models/models').Post;
const User = require('../models/models').User;

const should = chai.should();
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

function clearDatabase() {
    let promises = [
        User.remove().exec(),
        Post.remove().exec()
    ];

    Promise.all(promises).then(function () {
    });
}

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
        let user = new User(
            {
                username: 'Bruce',
                email: 'brucewayne@test.com',
                password: 'test'
            }
        );
        user.save(function (err) {
            if (err) {
                {
                    throw err;
                }
            }
        });
        chai.request(server)
            .post('/login')
            .auth('Bruce', 'test')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('token');
                done()
            });
    });
    it('returns unauthorized when invalid credentials used', function (done) {
        let user = new User(
            {
                username: 'Bruce',
                email: 'brucewayne@test.com',
                password: 'test'
            }
        );
        user.save(function (err) {
            if (err) {
                {
                    throw err;
                }
            }
        });
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
describe('Getting posts', function () {
    let server;
    beforeEach(function (done) {
        server = require('../app').server;
        clearDatabase();
        let user = new User(
            {
                username: "Bruce",
                email: "brucewayne@test.com",
                password: 'test',
                admin: false
            }
        );
        user.save(function (err) {
            if (err)
                throw err;
            new Post(
                {
                    author: user._id,
                    content: 'Test'
                }
            ).save(function (err) {
                if (err)
                    throw err;
                done();
            })
        });
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
        let user = new User(
            {
                username: 'Bruce',
                email: 'brucewayne@test.com',
                password: 'test'
            }
        );
        user.save(function (err) {
            if (err) {
                {
                    throw err;
                }
            }
        });
        chai.request(server)
            .post('/posts/')
            .send({
                author: user,
                content: 'test',
                token: require('../routes/login').createToken(user)
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
        let user = new User({
            username: 'Bruce',
            password: 'test',
            email: 'bruce@test.com'
        });
        user.save(function (err) {
            if (err)
                throw err;
        });
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

        let admin = new User(
            {
                username: 'Admin',
                email: 'admin@admin.com',
                password: 'admin',
                admin: true
            }
        );

        admin.save(function (err) {
            if (err) {
                throw err;
            }
        });

        let user = new User(
            {
                username: 'Bruce',
                email: 'brucewayne@test.com',
                password: 'test'
            }
        );
        user.save(function (err) {
            if (err) {
                {
                    throw err;
                }
            }
        });
        chai.request(server)
            .post('/admin/')
            .send({
                user: 'Bruce',
                token: require('../routes/login').createToken(admin)
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('success');
                res.body.success.should.be.equal(true);
                res.body.should.have.property('message');
                res.body.message.should.have.property('ok');
                res.body.message.ok.should.be.equal(1);


                done()
            });
    });
    it('fails to grant privileges when user is not admin', function (done) {
        let admin = new User(
            {
                username: 'Admin',
                email: 'admin@admin.com',
                password: 'admin',
                admin: false
            }
        );

        admin.save(function (err) {
            if (err) {
                throw err;
            }
        });

        let user = new User(
            {
                username: 'Bruce',
                email: 'brucewayne@test.com',
                password: 'test'
            }
        );
        user.save(function (err) {
            if (err) {
                {
                    throw err;
                }
            }
        });
        chai.request(server)
            .post('/admin/')
            .send({
                user: 'Bruce',
                token: require('../routes/login').createToken(admin)
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