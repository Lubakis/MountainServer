'use strict'
const Boom = require('boom')
const JWT = require('jsonwebtoken')
const config = require('../configs/config')
const addUser = require('../lib/utils').addUser

module.exports = function (request, reply) {
  const signUpData = request.payload.user
  signUpData.location = request.payload.location

  if (signUpData.password === signUpData.confirmed_password) {
    addUser(request, signUpData)
      .then((np) => {
        const token = JWT.sign({ id: np._id, email: np.email }, config.JWT.secret)
        return reply({token: token, fullname: np.full_name})
      })
      .catch((err) => { return reply(Boom.unauthorized(err.message)) })
  } else {
    return reply(Boom.unauthorized('passwords do not match'))
  }
}
