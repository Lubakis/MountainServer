const Joi = require('joi')
const loginHandler = require('../handlers/loginHandler')
const registerHandler = require('../handlers/registerHandler')
const loginFbHandler = require('../handlers/loginFbHandler')
const registerFbHandler = require('../handlers/registerFbHandler')
const updateProfileHandler = require('../handlers/updateProfileHandler')
const getProfilesHandler = require('../handlers/getProfilesHandler')
const getUserProfile = require('../handlers/getUserProfile')

const UserRoutes = [
  {
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
          'Content-Type': Joi.string().regex(/(application\/json)/)
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
          'Content-Type': Joi.string().regex(/(application\/json)/)
        }).unknown()
      }
    }
  },
  {
    method: 'GET',
    path: '/profile/{userId}',
    config: {
      auth: 'jwt',
      handler: getUserProfile,
      validate: {
        headers: Joi.object({
          'Authentication-Token': Joi.string().token()
        }).unknown()
      }
    }
  },
  {
    method: 'POST',
    path: '/profile/update',
    config: {
      handler: updateProfileHandler,
      payload: {
        output: 'data',
        parse: true
      },
      auth: 'jwt',
      validate: {
        payload: {
          email: Joi.string().email(),
          new_password: Joi.string(),
          confirmed_password: Joi.string(),
          phone_number: Joi.string(),
          username: Joi.string(),
          first_name: Joi.string(),
          last_name: Joi.string()
        },
        headers: Joi.object({
          'Content-Type': Joi.string().regex(/(application\/json)/),
          'Authentication-Token': Joi.string().token()
        }).unknown()
      }
    }
  },
  {
    method: 'GET',
    path: '/profiles',
    config: {
      auth: 'jwt',
      handler: getProfilesHandler,
      validate: {
        headers: Joi.object({
          'Authentication-Token': Joi.string().token()
        }).unknown()
      }
    }
  }
]

module.exports = {
  userRoute: UserRoutes
}
