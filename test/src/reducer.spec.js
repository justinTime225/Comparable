import { expect } from 'chai';
import skillReducer from '../../src/reducers/Skills_Reducers.jsx';
import { SKILLS_ACTION } from '../../src/actions/Skills_Actions.jsx';
import getOffer from '../../src/actions/Skills_Actions.jsx';

describe('Skill Reducer', () => {
  it('handles action with unknown type', () => {
    expect(skillReducer(undefined, {})).to.eql([])
  });
  it('handles action with unknown type SKILL_ACTION ', () => {
    const action = {type: SKILLS_ACTION, payload: {data: ['new skill']}};
    expect(skillReducer([], action)).to.eql(['new skill']);
  })
})