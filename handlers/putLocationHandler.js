'use strict'
const Boom = require('boom')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  const userId = request.auth.credentials.id
  const location = request.payload

  User.findOneAndUpdate({_id: userId}, {location: {lat: location.lat, lng: location.lng}})
    .then((result) => {
      return reply({result: result})
    })
    .catch(err => {
      return reply(Boom.badData(err.message))
    })
}
