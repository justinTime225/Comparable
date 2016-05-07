const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server/server.js');

describe('routes', () => {
  describe('/api/jobs', () => {
    it('returns list of jobs, filtered by title', (done) => {
      const jobTitle = 'Software Engineer';
      const params = {
        title: jobTitle,
      };

      request(app)
        .get('/api/jobs')
        .query(params)
        .expect(200)
        .expect(res => {
          expect(res.body[5].title).to.equal(jobTitle);
        })
        .end(done);
    });
  });
});
