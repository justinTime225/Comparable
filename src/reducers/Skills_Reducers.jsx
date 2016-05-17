import { SKILLS_ACTION } from '../actions/Skills_Actions';

export default function (state = [], action) {
  switch(action.type) {
    case SKILLS_ACTION:
      return [...action.payload.data];
  }
  return state;
}