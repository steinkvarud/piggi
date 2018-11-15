const express = require('express');
const router = new express.Router();

const service = require('../service/sbanken');

router.use(function timeLog(req, res, next) {
  next();
});

// define the home page route
router.get('/', function(req, res) {
  service.getAccessToken().then((data) => {
    service.getAccountDetails(data.access_token)
        .then((accountData) => {
          console.log('Rendering account data ' + accountData);
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
