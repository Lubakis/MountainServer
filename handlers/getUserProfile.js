'use strict'
const Boom = require('boom')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  User.findOne({_id: request.params.userId}, { password: 0 })
  .then(result => {
    return reply(result)
  })
  .catch(err => {
    return reply(Boom.badData(err.message))
  })
}
