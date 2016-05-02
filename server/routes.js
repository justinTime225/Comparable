// TODO: Implement routes file to reduce weight on server.js
// const angelListController = require('./angelList/angel_list_controller');
//
// const sendResponse = function (res, err, data, status) {
//   if (err) {
//     res.status(400).send('Error');
//   } else {
//     res.status(status).send(data);
//   }
// };
//
// module.exports = app => {
//   app.route('/api/jobs')
//     .get((req, res) => {
//       angelListController.filterAngelListData(req.title, (err, data) => {
//         console.log('hello')
//         sendResponse(res, err, data, 200);
//       });
//     });
// };
