const Promise = require('promise');
const btoa = require('btoa');
const httpClient = require('superagent');

exports.getAccessToken = () => {
  const clientId = process.env.SBANKEN_CLIENT_ID || 'clientId';
  const secret = process.env.SBANKEN_SECRET || '1337';
  const identityServer = 'https://auth.sbanken.no/identityserver/connect/token';
  const basicAuth = btoa(clientId + ':' + secret);

  const promise = new Promise(function(resolve, reject) {
    console.log('Getting access token');
    httpClient
        .post(identityServer)
        .send('grant_type=client_credentials')
        .set('Authorization', 'Basic '+basicAuth)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log(err);
            reject();
          } else {
            console.log('Access token retrieved');
            resolve(res.body);
          }
        });
  });
  return promise;
};

exports.getAccountDetails = (token) => {
  const ssn = process.env.SSN || '12345678910';
  const accountServiceUrl = 'https://api.sbanken.no/Bank/api/v1/Accounts/';
  const filter = process.env.ACCOUNT_ID.split(',') || '007';

  console.log('Getting account details ' + filter);
  const promise = new Promise(function(resolve, reject) {
    httpClient
        .get(accountServiceUrl)
        .set('Authorization', 'Bearer '+token)
        .set('Accept', 'application/json')
        .set('customerId', ssn)
        .end(function(err, res) {
          if (err || !res.ok) {
            console.log(err);
            reject();
          } else {
            const accounts = res.body.items;
            console.log('Accounts retrieved');

            const accountList = [];

            for (const x in accounts) {
              if ( x != null) {
                accountList.push(accounts[x]);
              }
            }

            const filteredList = accountList.filter(function(account) {
              return filter.indexOf(account.accountId) >= 0;
            });
            console.log('Accounts filtered. ' + filteredList.length) + ' accounts found';

            const result = [];
            filteredList.forEach(function(account) {
              result.push(new Account(account.name, account.balance));
            });
            console.log('Sending filtered accounts to front end');
            resolve(result);
          }
        });
  });
  return promise;
};

/**
 * Account objetc
 * @param {*} name
 * @param {*} balance
 */
function Account(name, balance) {
  this.name = name;
  this.balance = balance;
};
