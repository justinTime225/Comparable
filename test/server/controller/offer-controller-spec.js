const expect = require('chai').expect;
const offerController = require('../../../server/controllers/offer-controller');
const Offer = require('../../../server/models/offer-model');

describe('Offer Controller', () => {
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

  describe('getOffers', () => {
    it('returns users offers', () => {
      const params = {
        query: {
          userEmail: 'test@example.com',
        },
      };

      offerController.getOffers(params, (err, data) => {
        expect(data._id).to.equal('573ba23e40221bd7493a3015');
        expect(data.userEmail).to.equal('test@example.com');
        expect(data.title).to.equal('UX Engineer');
      });
    });
  });

  describe('getUsersOffers', () => {
    it('given a specific job title, returns all users offers with same job title', () => {
      const params = {
        title: 'UX Engineer',
      };

      offerController.getUsersOffers(params, (err, data) => {
        expect(typeof data[0]).to.equal('object');
        expect(data[0].title).to.equal('UX Engineer');
      });
    });
  });
});
