# piggi [![Build Status](https://travis-ci.com/mariusbreivik/piggi.svg?branch=master)](https://travis-ci.com/mariusbreivik/piggi)

piggi is an integration to the sbanken api

## setup

### environment variables

Set the following env`s:
```
- SSN - Your own social security number
- SBANKEN_CLIENT_ID - clientId obtained from Sbanken
- SBANKEN_SECRET - password obtained from Sbanken
```

### Install dependencies

Run:
```
$ npm install
``` 

### Run local server

Start the Express server on your local machine

Run:
```
$ npm run dev
```
Access the local server http://localhost:3001