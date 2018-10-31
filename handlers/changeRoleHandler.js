const Boom = require('boom')
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  const newRole = request.payload.role
  User.findOneAndUpdate({_id: request.payload.userId}, { role: newRole })
  .then(result => {
    delete result._doc.password
    return reply(result)
  })
  .catch(err => {
    return reply(Boom.badData(err.message))
  })
}
