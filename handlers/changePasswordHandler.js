'use strict'
const Boom = require('boom')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../configs/config')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  const email = request.auth.credentials.email
  const newPassword = request.payload.password.toString()
  const confirmedPassword = request.payload.confirmed_password.toString()

  if (newPassword === confirmedPassword) {
    User.findOneAndUpdate({email: email}, {password: bcrypt.hashSync(newPassword, config.SALT_WORK_FACTOR)})
      .then((result) => {
        const token = JWT.sign({id: result.id, email: result.email}, config.JWT.secret)
        return reply({token: token}).state('session', token, config.cookie_options)
      })
      .catch(err => { return reply(Boom.badData(err.message)) })
  } else {
    return reply(Boom.unauthorized('passwords do not match'))
  }
}
