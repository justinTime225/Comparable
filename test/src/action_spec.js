import { expect } from 'chai';
import { displayJob } from '../../src/actions/Job_Display.jsx';
import { changeOffer, toggleChart } from '../../src/actions/Offer_Actions.jsx';
import { sendJob, getUserOffers } from '../../src/actions/Job_Matches.jsx';
import { SKILLS_ACTION, getSkills } from '../../src/actions/Skills_Actions.jsx';

describe('Job Display actions', () => {
  describe('displayJob', () => {
    it('should return an object with the proper type', () => {
      expect(displayJob().type).to.equal('JOB_DISPLAY');
    });
    it('should return an object with a payload', () => {
      var job = {title: 'software engineer'};
      expect(displayJob(job).payload).to.equal(job);
    })
  });
});

describe('Offer Actions', () => {
  describe('changeOffer', () => {
    it('should return an object with the proper type', () => {
      expect(changeOffer().type).to.equal('CHANGE_OFFER');
    });
  });

  describe('toggleChart', () => {
    it('should return an object with the proper type', () => {
      expect(toggleChart().type).to.equal('TOGGLE_CHART');
    });
  });
});

describe('Job Matches', () => {
  describe('sendJob', () => {
    it('should return an object with the proper type', () => {
      expect(sendJob({title: 'test', location: 'test'}).type).to.equal('JOB_MATCH');
    });
  });

    describe('getUserOffers', () => {
      it('should return an object with the proper type', () => {
        expect(getUserOffers({title: 'test', location: 'test'}).type).to.equal('GET_USERS');
      });
    });
});

describe('Skills actions', () => {
  describe('getSkills', () => {
    it('should return an object with the proper type', () => {
      var data = {title: 'Frontend Engineer'};
      expect(getSkills(data).type).to.equal(SKILLS_ACTION);
    });
  });
});
