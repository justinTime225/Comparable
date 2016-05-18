import { expect } from 'chai';
import { displayJob } from '../../src/actions/Job_Display.jsx';

describe('Job Display actions', () => {
  describe('displayJob', () => {
    it('should return an object with the proper type', () => {
      expect(displayJob().type).to.equal('JOB_DISPLAY');
    });
  });
});
