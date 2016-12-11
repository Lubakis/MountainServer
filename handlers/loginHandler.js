'use strict'
const Boom = require('boom')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../configs/config')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  const email = request.payload.email
  const username = request.payload.username
  const password = request.payload.password.toString()
  if (!email) var query = {username: username}
  else query = {email: email}

  User.findOne(query)
  .then((np) => {
    bcrypt.compare(password, np.password, (err, result) => {
      if (!err && result) {
        const token = JWT.sign({ id: np._id, email: np.email, role: np.role }, config.JWT.secret)
        return reply({token: token, fullname: np.full_name})
      } else if (!result) {
        return reply(Boom.unauthorized('Wrong username/password'))
      } else {
        return err
      }
    })
  })
  .catch((err) => { return reply(Boom.unauthorized(err.message)) })
}
