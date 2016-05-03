import axios from 'axios';

const getRelevantOffers = {
  getJobs: title => {
    axios.get('/api/jobs', {
    params: {
      title: title,
    },
  })
    .then(response => {
      console.log(response);
    })
    .catch(response => {
      console.log(response);
    });
  },
};

module.exports = getRelevantOffers;
