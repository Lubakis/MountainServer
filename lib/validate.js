'use strict'
const User = require('../models/user.js').User

const validate = function (decoded, request, callback) {
  User.findOne({email: decoded.email})
    .then((user) => {
      if ((decoded.email) === (user.email)) {
        return callback(null, true)
      } else {
        return callback(null, false)
      }
    })
}

module.exports = {
  validate: validate
}
