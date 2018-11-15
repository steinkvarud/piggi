const express = require('express');
const router = new express.Router();

const service = require('../service/sbanken');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  console.log('getting access token');
  service.getAccessToken().then((data) => {
    service.getAccountDetails(data.access_token)
        .then((accountData) => {
          res.render('index', {
            account: accountData,
          });
        })
        .catch((error) => {
          res.render('error');
        });
  });
});

module.exports = router;
