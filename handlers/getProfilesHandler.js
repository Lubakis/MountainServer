'use strict'
const Boom = require('boom')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  const role = request.auth.credentials.role

  switch (role) {
    case 'Administrator': {
      User.find()
      .then(result => {
        return reply(result)
      })
      .catch(err => {
        return reply(Boom.system(err.message))
      })
    }
      break
    case 'MointainDispatcher': {
      User.find({role: 'MountainRescuer'}).select('location')
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
