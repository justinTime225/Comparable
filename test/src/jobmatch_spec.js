import { expect } from 'chai';
import { sendJob } from '../../src/actions/Job_Matches.jsx';
import { getUserOffers } from '../../src/actions/Job_Matches.jsx';
import { JOB_MATCH } from '../../src/actions/Job_Matches.jsx';
import { GET_USERS } from '../../src/actions/Job_Matches.jsx';

describe('Job Match Action', () => {
  describe('Send Job', ()=> {
    let data;
    beforeEach(function() {
      data = {title: 'Backend Engineer'};
    });
    it('should return the correct action type', () => {
      expect(sendJob(data).type).to.equal(JOB_MATCH);
    });
  });
  describe('Get User Offers', () => {
    let data;
    beforeEach(function() {
      data = {title: 'Backend Engineer'};
    })
    it('should return the correct action type', () => {
      expect(getUserOffers(data).type).to.equal(GET_USERS);
    })
  });
});