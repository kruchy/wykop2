var request = require('supertest');

describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('./server')
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