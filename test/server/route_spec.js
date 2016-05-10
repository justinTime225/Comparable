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


  describe('/api/offer-filters', () => {
    it('returns an object with keys for jobTitles and tags', (done) => {

      request(app)
        .get('/api/offer-filters')
        .expect(200)
        .expect(res => {
          expect(res.body.jobTitles).to.exist;
          expect(res.body.tags).to.exist;
        })
        .end(done);
    });
  });

  describe('/api/skills', () => {
    it('returns 200 success code', (done) => {
      request(app)
        .get('/api/skills')
        .expect(200)
        .expect(res => {
          expect(res.body[0].skill).to.exist;
        })
        .end(done);
    });
  });
});
