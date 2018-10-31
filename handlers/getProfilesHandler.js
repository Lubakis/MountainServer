'use strict'
const Boom = require('boom')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  const role = request.auth.credentials.scope
  switch (role) {
    case 'Administrator': {
      User.find({}, { password: 0 })
      .then(result => {
        return reply(result)
      })
      .catch(err => {
        return reply(Boom.system(err.message))
      })
    }
      break
    case 'MointainDispatcher': {
      User.find({role: 'MountainRescuer'}, { password: 0 }).select('location')
      .then(result => {
        return reply(result)
      })
      .catch(err => {
        return reply(Boom.system(err.message))
      })
    }
      break
    case 'User':
    case 'MountainRescuer': {
      User.findOne({_id: request.auth.credentials.id}).select('location')
      .then(result => {
        return reply(result)
      })
      .catch(err => {
        return reply(Boom.system(err.message))
      })
    }
      break
  }
}
