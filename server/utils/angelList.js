const https = require('https');
const fs = require('fs');
const _ = require('underscore');

// set angelList API key
const angelListToken = process.env.AngelList || require('../config/.secrets.json').angelList.access_token;

// angelList job locations
const locations = [1692, 1653, 1617, 1705];

// temp storage for all pages of data from angellist API
const dataAll = { jobs: [] };

// GET request for angellist API
const getAngelListData = (pageNum, locationIndex) => {
  pageNum = pageNum || 1;
  locationIndex = locationIndex || 0;

  const angelListUrl = `https://api.angel.co/1/tags/${locations[locationIndex]}/jobs?access_token=${angelListToken}&page=${pageNum}`;

  https.get(angelListUrl, (res) => {
    // temp storage for data chunks
    var currData = '';

    res.on('data', (data) => {
      currData += data;
    }).on('end', () => {
      currData = JSON.parse(currData);
      chunkData(currData, currData.page, locationIndex);
    });

  }).on('error', (err) => {
    console.error(err);
  });
};

// adds data from getAngelListData to dataAll.jobs
const chunkData = (currData, pageNum, locationIndex) => {
  dataAll.jobs = dataAll.jobs.concat(currData.jobs);

  // if last page of data from getAngelListData
  // create a data file
  // otherwise recursively call getAngelListData with next page number
  if (pageNum <= currData.last_page) {
    getAngelListData(pageNum + 1, locationIndex);
  } else {
    if (locationIndex < locations.length) {
      getAngelListData(1, locationIndex + 1);
    } else {
      addLocation(dataAll);
    }
  }
};

// Add location to each job
const addLocation = (data) => {
  _.each(data.jobs, (job) => {
    if (typeof job !== 'undefined') {

      _.each(job.tags, (tag) => {
        if (tag.tag_type === 'LocationTag') {
          job.location = tag.display_name;
        }
      });
    }

    if (dataAll[dataAll.length - 1] === job) {
      createDataFile(data);
    }
  });
};

// handles creating the JSON file with all data from getAngelListData
const createDataFile = data => {
  data.jobs.splice(data.jobs.length - 1, 1);
  fs.writeFile('angelList.json', JSON.stringify(data, null, 4), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
};

// runs with postinstall script in package.json
getAngelListData();
