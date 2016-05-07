const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');
// import https from 'https';

describe('routes', () => {
  describe('/api/jobs', () => {
    it('returns list of jobs, filtered by title', (done) => {

      // const jobTitle = 'Software Engineer';
      // const params = {
      //   title: jobTitle,
      // };

      // https.get('/api/jobs?title=Software Engineer', (status, res) => {
        // temp storage for data chunks
        // expect
        // res.on('data', (data) => {
        //   currData += data;
        // }).on('end', () => {
        //   currData = JSON.parse(currData);
        //   chunkData(currData, currData.page);
        // });
      //     console.log('status', status);
      //     console.log('res', res);
      // }).on('error', (err) => {
      //   console.error('err', err);
      // });

      request(app)
        .get('/api/jobs?title=Software Engineer')
        .expect(200)
        .end(function (err, res) {
          console.log('hello');
          expect(res.body.tripName).to.equal('Testing');
          done();
        });

      // request(app)
      // .get('/api/jobs')
      // .expect(300)
      // .end((err, res) => {
      //   console.log('err', err);
      //   console.log('res', res);
      //   done();
      // });
      //
      // console.log('inti');

      // setTimeout(() => {
      //   request(app)
      //     .get('/api/jobs')
      //     .expect(200, (res) => {
      //       expect(res.body.id).to.equal('some fixed id');
      //     }).then(done());
      // }, 10000);
    });
  });
});
