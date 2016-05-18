const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server/server.js');
const Offer = require('../../server/models/offer-model');

describe('routes', () => {
  describe('/api/jobs', () => {
    it('returns list of jobs, filtered by title', (done) => {
      const jobTitle = 'Software Engineer';
      const params = {
        title: jobTitle,
        location: 'San Francisco',
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

  describe('/api/offers', () => {
    after(() => {
      Offer.remove({ userEmail: 'test@example.com' }, (err, removed) => {
        if (err) {
          console.log('error deleting record', err);
        } else {
          console.log('successfully removed!');
        }
      });
    });

    it('POST: returns 302 success code', (done) => {
      const params = {
        userEmail: 'test@example.com',
        title: 'UI Engineer',
        location: 'Los Angeles',
        salary: 1,
        equity: '1.5',
      };

      request(app)
      .post('/api/offers')
      .send(params)
      .expect(302)
      .end(done);
    });

    it('GET: returns 200 success code', (done) => {
      const params = {
        userEmail: 'test@example.com',
      };

      request(app)
        .get('/api/offers')
        .query(params)
        .expect(200)
        .expect(res => {
          expect(res.body[0].title).to.equal('UI Engineer');
        })
        .end(done);
    });
  });

  describe('/api/users/offers', () => {
    before(() => {
      const offer = new Offer({
        userEmail: 'test@example.com',
        title: 'UX Engineer',
        location: 'Irvine',
        salary: 1,
        equity: '1.5',
      });

      offer.save();
    });

    after(() => {
      Offer.remove({ userEmail: 'test@example.com' }, (err, removed) => {
        if (err) {
          console.log('error deleting record', err);
        } else {
          console.log('successfully removed!');
        }
      });
    });

    const params = {
      title: 'UX Engineer',
    };

    it('returns 200 success code', (done) => {
      request(app)
      .get('/api/users/offers')
      .query(params)
      .expect(200)
      .expect(res => {
        expect(res.body[0].title).to.equal('UX Engineer');
      })
      .end(done);
    });
  });
});
