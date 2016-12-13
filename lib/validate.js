'use strict'
const User = require('../models/user.js').User

module.exports = function (decoded, request, callback) {
  User.findOne({email: decoded.email})
    .then((user) => {
      if ((decoded.email) === (user.email)) {
        return callback(null, true)
      } else {
        return callback(null, false)
      }
    })
}
