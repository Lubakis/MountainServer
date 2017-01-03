'use strict'
// this is just a test

module.exports = {
  goodOptions: {
    ops: {
      interval: 1000
    },
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  },
  swaggerOptions: {
    info: {
      title: 'MointainServer API Documentation',
      description: `Api Documentation for the Mountain Server`
    },
    expanded: 'full'
  },
  mongo: {
    url: '127.0.0.1:27017',
    database: 'pss-api'
  },
  credentials: {
    'facebook': {
      'AppID': 'facebookAppId',
      'AppSecret': 'facebookAppSecret', //
      'verificationURI': 'https://graph.facebook.com/me?access_token'
    }
  },
  JWT: {
    secret: 'neverShareYourSecret'
  },
  SALT_WORK_FACTOR: 10,
  apiURL: 'http://localhost:8001'
}
