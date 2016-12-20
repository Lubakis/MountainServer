'use strict'
const Boom = require('boom')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../configs/config')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  let newProfileData = {}
  const query = { email: request.auth.credentials.email }
  for (let key of Object.keys(request.payload)) {
    newProfileData[key] = request.payload[key]
  }
  if (newProfileData.email === query.email) { delete newProfileData.email }
  if ((newProfileData.new_password) && (newProfileData.new_password === newProfileData.confirmed_password)) {
    newProfileData.password = bcrypt.hashSync(newProfileData.new_password, config.SALT_WORK_FACTOR)
    delete newProfileData.newPassword
    delete newProfileData.confirmedPassword
  }

  User.findOneAndUpdate(query, newProfileData)
      .then((result) => {
        const token = JWT.sign({id: result.id, email: result.email}, config.JWT.secret)
        return reply({token: token}).state('session', token, config.cookie_options)
      })
      .catch(err => {
        return reply(Boom.badData(err.message))
      })
}
