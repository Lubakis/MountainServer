'use strict'
const Joi = require('joi')
const loginHandler = require('../handlers/loginHandler')
const registerHandler = require('../handlers/registerHandler')
const changePasswordHandler = require('../handlers/changePasswordHandler')
const putLocationHandler = require('../handlers/putLocationHandler')
const loginFbHandler = require('../handlers/loginFbHandler')
const registerFbHandler = require('../handlers/registerFbHandler')
const getProfilesHandler = require('../handlers/getProfilesHandler')

const route = [{
  method: 'POST',
  path: '/login',
  handler: loginHandler,
  config: {
    payload: {
      output: 'data',
      parse: true
    },
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email(),
        username: Joi.string(),
        password: Joi.string().required()
      }
    }
  }
},
  {
    method: 'POST',
    path: '/register',
    config: {
      handler: registerHandler,
      payload: {
        output: 'data',
        parse: true
      },
      auth: false,
      validate: {
        payload: {
          user: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmed_password: Joi.string().required(),
            phone_number: Joi.string(),
            username: Joi.string(),
            role: Joi.string().required().allow('Administrator', 'MointainDispatcher', 'MountainRescuer', 'User'),
            first_name: Joi.string(),
            last_name: Joi.string()
          }),
          location: Joi.object({
            lat: Joi.number(),
            lng: Joi.number()
          })
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/location',
    config: {
      payload: {
        output: 'data',
        parse: true
      },
      handler: putLocationHandler,
      auth: 'jwt',
      validate: {
        payload: {
          lat: Joi.number().required(),
          lng: Joi.number().required()
        },
        headers: Joi.object({
          'content-type': Joi.string().regex(/(application\/json)/).required()
        }).unknown()
      }
    }
  },
  {
    method: 'POST',
    path: '/login/facebook',
    handler: loginFbHandler,
    config: {
      payload: {
        output: 'data',
        parse: true
      },
      auth: false,
      validate: {
        payload: {
          fb_token: Joi.string().required()
        },
        headers: Joi.object({
          'content-type': Joi.string().regex(/(application\/json)/).required()
        }).unknown()
      }
    }
  },
  {
    method: 'POST',
    path: '/register/facebook',
    config: {
      handler: registerFbHandler,
      payload: {
        output: 'data',
        parse: true
      },
      auth: false,
      validate: {
        payload: {
          fb_token: Joi.string().token().required(),
          role: Joi.string().required().allow('Administrator', 'MointainDispatcher', 'MountainRescuer', 'User'),
          location: Joi.object({
            lat: Joi.number(),
            lng: Joi.number()
          })
        },
        headers: Joi.object({
          'content-type': Joi.string().regex(/(application\/json)/).required()
        }).unknown()
      }
    }
  },
  {
    method: 'GET',
    path: '/profiles',
    config: {
      auth: 'jwt',
      handler: getProfilesHandler
    }
  },
  {
    method: 'POST',
    path: '/changepass',
    config: {
      handler: changePasswordHandler,
      payload: {
        output: 'data',
        parse: true
      },
      auth: 'jwt',
      validate: {
        payload: {
          password: Joi.string().required(),
          confirmed_password: Joi.string().required()
        }
      }
    }
  }
]

module.exports = {
  route: route
}
