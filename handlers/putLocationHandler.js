'use strict'
const Boom = require('boom')
const Location = require('../models/location.js').Location

module.exports = function (request, reply) {
  const userId = request.auth.credentials.id
  const location = request.payload
  let updateValue = {
    lat: location.lat,
    lng: location.lng,
    altitude: location.altitude
  }
  const options = {
    upsert: true,
    setDefaultsOnInsert: true
  }
  location.coordinateAccuracy ? (updateValue.coordinateAccuracy = location.coordinateAccuracy) : {}
  Location.findOneAndUpdate({
    _user: userId
  }, updateValue, options)
    .then((result) => {
      if (result) return reply({location: location})
      else return reply(Boom.badData('User has no initial location'))
    })
    .catch(err => {
      return reply(Boom.badData(err.message))
    })
}
