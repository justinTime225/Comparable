const angelListFile = require('../../angelList.json');
const _ = require('underscore');
const toTitleCase = require('../utils/helpers');

module.exports = {
  getSkills: (title, callback) => {
    const skillCount = {};
    const skills = [];
    var sample;

    // filter collection based on title
    // if title was provided
    if (title) {
      // returns array of objects containing just jobs and tags
      sample = _.flatten(
        _.pluck(_.filter(angelListFile.jobs, (job) => {
          if (job.title) {
            return job.title === title;
          }
        }), 'tags')
      );
    } else {
      // returns array of objects containing skills only
      sample = _.flatten(
        _.pluck(angelListFile.jobs, 'tags')
      );
    }

    // caculate count of all skill tags
    _.each(sample, (skill) => {
      if (skillCount[skill.display_name]) {
        skillCount[skill.display_name]++;
      } else {
        skillCount[skill.display_name] = 1;
      }
    });

    // maps skill tags count into an array of objects
    _.mapObject(skillCount, (val, key) => {
      skills.push({ skill: key, count: val });
    });

    return callback(null, skills);
  },

  filterAngelListData: (params, callback) => {
    const title = toTitleCase(params.title);
    const location = toTitleCase(params.location);

    // filter data in data file by job title and return to GET request as response
    const filteredData = _.filter(angelListFile.jobs, (job) => {
      if (job.title) {
        return job.title === title && job.location === location;
      }
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
    callback(null, id);
  },
};
