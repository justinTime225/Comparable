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

  getOfferFilters: callback => {
    const filters = {};

    // grab all job titles in database
    // remove duplicate jobs
    filters.jobTitles = _.pluck(angelListFile.jobs, 'title');
    filters.jobTitles = _.uniq(filters.jobTitles);

    // grab all tags tags: [][{}, {}], [{}, {}]]
    // flatten tags into 1 array of objects
    // replace filter.tags with only display_name in tags
    // remove duplicate display_names
    filters.tags = _.flatten(_.pluck(angelListFile.jobs, 'tags'));
    filters.tags = _.pluck(filters.tags, 'display_name');
    filters.tags = _.uniq(filters.tags);

    return callback(null, filters);
  },

  getJobDetails: (id, callback) => {
    console.log(id);
    callback(null, id);
  },
};
