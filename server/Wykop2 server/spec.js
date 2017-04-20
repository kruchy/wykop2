var request = require('supertest');

describe('loading express', function () {
    var login;
    beforeEach(function () {
        login = require('./server')
    });
    afterEach(function () {
        login.close();
    });
    it('responds to GET /login',function testSlash(done) {
        request(login)
            .get('/login')
            .expect(200,done);
    });
    it('responds to POST /login',function testPostSlash(done) {
        request(login)
            .post('/login')
            .expect(200,done);
    });
});