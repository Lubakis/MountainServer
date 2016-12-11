const Boom = require('boom')
const JWT = require('jsonwebtoken')
const config = require('../configs/config')
const Req = require('../lib/requests').Req
const req = new Req(config)
const User = require('../models/user.js').User

module.exports = function (request, reply) {
  const fbToken = request.payload.fb_token

  req.requestFbVerifyToken(fbToken).then((result) => {
    User.findOne({ username: result.id })
    .then((np) => {
      if (!np) return reply(Boom.unauthorized(null, 'Custom'))
      else {
        const token = JWT.sign({ id: np._id, email: np.email, role: np.role }, config.JWT.secret)
        return reply({ token: token })
      }
    })
  })
    .catch(err => { return reply(Boom.unauthorized(err.message)) })
}
