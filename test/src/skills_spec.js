import { expect } from 'chai';
import { SKILLS_ACTION } from '../../src/actions/Skills_Actions.jsx';
import { getSkills } from '../../src/actions/Skills_Actions.jsx';
import axios from 'axios';
describe('Skills actions', () => {
  describe('getSkills', () => {
    it('should return an object with the proper type', () => {
      var data = {title: 'Frontend Engineer'};
      expect(getSkills(data).type).to.equal(SKILLS_ACTION);
    });
  });
});
