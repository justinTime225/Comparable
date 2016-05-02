const https = require('https');
const fs = require('fs');

// set angelList API key
const angelListToken = process.env.AngelList || require('../config/.secrets.json').angelList.access_token;

// temp storage for all pages of data from angellist API
const dataAll = { jobs: [] };

// GET request for angellist API
const getAngelListData = pageNum => {
  https.get('https://api.angel.co/1/tags/1692/jobs?access_token=' + angelListToken + '&page=' + pageNum, (res) => {

    // temp storage for data chunks
    var currData = '';

    res.on('data', (data) => {
      currData += data;
    }).on('end', () => {
      currData = JSON.parse(currData);
      chunkData(currData, currData.page);
    });

  }).on('error', (err) => {
    console.error(err);
  });
};

// adds data from getAngelListData to dataAll.jobs
const chunkData = (currData, pageNum) => {
  dataAll.jobs = dataAll.jobs.concat(currData.jobs);

  // if last page of data from getAngelListData
  // create a data file
  // otherwise recursively call getAngelListData with next page number
  if (pageNum === currData.last_page) {
    createDataFile(dataAll);
  } else {
    getAngelListData(pageNum + 1);
  }
};

// handles creating the JSON file with all data from getAngelListData
const createDataFile = data => {
  fs.writeFile('angelList.json', JSON.stringify(data, null, 4), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
};

// Uncomment and run file with node to update data
// getAngelListData(1);
