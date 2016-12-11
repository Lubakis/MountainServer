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
      'AppID': '686766988166832',
      'AppSecret': '86a865c0281e1e6363decfaff5d7b8f7',
      'verificationURI': 'https://graph.facebook.com/me?access_token'
    }
  },
  JWT: {
    secret: 'neverShareYourSecret'
  },
  SALT_WORK_FACTOR: 10,
  apiURL: 'http://localhost:8001'
}
