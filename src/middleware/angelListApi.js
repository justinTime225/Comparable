import axios from 'axios';

const getRelevantOffers = {
  getJobs: title => {
    var req = axios.get('/api/jobs', {
      params: {
        title: title
      }
    });
    console.log(req);
    // .then(response => {
    //   console.log(response.data);
      
    // })
    // .catch(response => {
    //   console.log(response);
    // });
  }
};

module.exports = getRelevantOffers;
