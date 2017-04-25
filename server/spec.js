var request = require('supertest');

process.env.NODE_ENV = 'test';

describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('./app').server;
    });
    afterEach(function () {
        server.close();
    });
    it('responds to GET /login',function testSlash(done) {
        request(server)
            .get('/login')
            .expect(200,done);
    });
    it('responds to POST /login',function testPostSlash(done) {
        request(server)
            .post('/login')
            .expect(200,done);
    });
});