const expect = require('chai').expect;
const angelList = require('../../../server/controllers/angellist-controller');

describe('AngelList Controller', () => {
  describe('filterAngelListData', () => {
    it('returns list of jobs, filtered by provided title', () => {
      const params = {
        title: 'Software Engineer',
        location: 'San Francisco',
      };

      angelList.filterAngelListData(params, (err, data) => {
        expect(typeof data).to.equal('object');
        expect(data[0].title).to.equal(params.title);
      });
    });
  });

  describe('getSkills', () => {
    it('returns a list of objects, containing skills, and their count', () => {
      const sample = angelList.getSkills('', (err, data) => {
        return data;
      });

      expect(Array.isArray(sample)).to.eq(true);
      expect(typeof sample[0]).to.eq('object');
      expect(sample[0].skill).to.exist;
      expect(sample[0].count).to.exist;
    });
  });
});
