const angelListFile = require('../../angelList.json');
const _ = require('underscore');
const toTitleCase = require('../utils/helpers');

module.exports = {
  getSkills: (title, callback) => {
    const skillCount = {};
    const skills = [];
    var sample;

    // filter collection based on title
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

    // creates an array of objects with skill tags & count
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
};
