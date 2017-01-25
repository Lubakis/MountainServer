'use strict'
const Joi = require('joi')
const putLocationHandler = require('../handlers/putLocationHandler')
const changeRoleHandler = require('../handlers/changeRoleHandler')
const userRoutes = require('./userRoutes')

const routes = [
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
          lng: Joi.number().required(),
          altitude: Joi.number().integer().required(),
          coordinateAccuracy: Joi.number().integer().optional()
        },
        headers: Joi.object({
          'Content-Type': Joi.string().regex(/(application\/json)/),
          'Authentication-Token': Joi.string().token()
        }).unknown()
      }
    }
  },
  {
    method: 'POST',
    path: '/set-role',
    handler: changeRoleHandler,
    config: {
      payload: {
        output: 'data',
        parse: true
      },
      auth: {
        strategies: ['jwt'],
        scope: ['Administrator']
      },
      validate: {
        payload: {
          userId: Joi.string().required(),
          role: Joi.string().required().allow('Administrator', 'MointainDispatcher', 'MountainRescuer', 'User')
        },
        headers: Joi.object({
          'Content-Type': Joi.string().regex(/(application\/json)/)
        }).unknown()
      }
    }
  }
]

let route = routes.concat(userRoutes.userRoute)

module.exports = {
  route: route
}
