'use strict'
const User = require('../models/user.js').User

module.exports = function (decoded, request, callback) {
  User.findOne({email: decoded.email})
    .then((user) => {
      if ((decoded.email) === (user.email)) {
        decoded.scope = user.role
        return callback(null, true, decoded)
      } else {
        return callback(null, false)
      }
    })
}
