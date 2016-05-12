import axios from 'axios';
export const SKILLS_ACTION = "SKILLS_ACTION";
export function getSkills(data) {

  var request = axios.get('/api/skills', {
    params: {
      title: data.title,
    },
  })

  return {
    type: SKILLS_ACTION,
    payload: request
  }

}