import axios from 'axios';
export const SKILLS_ACTION = "SKILLS_ACTION";
export function getSkills(data) {
  console.log('inside getSkills');
  console.log(data.title);
  var request = axios.get('/api/skills', {
    params: {
      title: data.title,
    },
  })
  console.log(request);

  return {
    type: SKILLS_ACTION,
    payload: request
  }

}