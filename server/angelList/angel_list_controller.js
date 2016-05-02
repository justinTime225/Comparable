const angelListFile = require('../../angelList.json');
const _ = require('underscore');

module.exports = {
  filterAngelListData: (title, callback) => {
    // filter data in data file by job title and return to GET request as response
    const filteredData = _.filter(angelListFile.jobs, (job) => {
      return job.title === title;
    });

    callback(null, filteredData);
  },
};
