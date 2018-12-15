const express = require('express');
const router = new express.Router();
const pkginfo = require('pkginfo')(module, 'version');

const service = require('../service/sbanken');
const ver = module.exports.version;
router.use(function timeLog(req, res, next) {
  next();
});

// define the home page route
router.get('/', function(req, res) {
  service.getAccessToken().then((data) => {
    service.getAccountDetails(data.access_token)
        .then((result) => {
          console.log('Rendering account data ' + result);
          res.render('index', {
            account: result,
            version: ver,
          });
        })
        .catch((error) => {
          res.render('error');
        });
  });
});

module.exports = router;
