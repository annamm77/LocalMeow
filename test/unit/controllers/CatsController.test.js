var request = require('supertest');

describe('CatsController', function() {

  describe('#addfavorite()', function() {
    it('should redirect to /login if no user is logged in', function (done) {
      request(sails.hooks.http.app)
        .post('/favorite')
        .send({ petfinderid: '9302898', userid: 'TESTTEST' })
        .expect('location','/login', done);
    });
  });

  describe('#unfavorite()', function() {
    it('should redirect to /login if no user is logged in', function (done) {
      request(sails.hooks.http.app)
        .post('/unfavorite')
        .send({ petfinderid: '9302898', userid: 'TESTTEST' })
        .expect('location','/login', done);
    });
  });

  describe('#getfavorites()', function() {
    it('should redirect to /login if no user is logged in', function (done) {
      request(sails.hooks.http.app)
        .get('/favorites/0293858')
        .send({ userid: '0293858' })
        .expect('location','/login', done);
    });
  });

  describe('#index()', function() {
    it('should redirect to /login if no user is logged in', function (done) {
      request(sails.hooks.http.app)
        .get('/cats/98005/0/0')
        .expect('location','/login', done);
    });
  });

});
