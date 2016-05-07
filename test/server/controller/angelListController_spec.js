const expect = require('chai').expect;
const angelList = require('../../../server/controllers/angelListController.js');

describe('AngelList Controller', () => {
  describe('filterAngelListData', () => {
    it('returns list of jobs, filtered by provided title', () => {
      const jobTitle = 'Software Engineer';

      angelList.filterAngelListData(jobTitle, (err, data) => {
        expect(typeof data).to.equal('object');
        expect(data[0].title).to.equal(jobTitle);
      });
    });
  });
});
