const Boom = require('boom')
const JWT = require('jsonwebtoken')
const config = require('../configs/config')
const Req = require('../lib/requests').Req
const addUser = require('../lib/utils').addUser

let req = new Req(config)

module.exports = function (request, reply) {
  const fbToken = request.payload.fb_token
  const role = request.payload.role

  req.requestFbSignUpToken(fbToken)
    .then((userData) => {
      let name = userData.name.split(' ')
      let signUpData = {
        username: userData.id,
        email: userData.email,
        first_name: name.shift(),
        last_name: name.pop(),
        password: ''
      }
      signUpData.location = request.payload.location
      signUpData.role = role

      addUser(request, signUpData)
        .then((np) => {
          const userToken = { token: JWT.sign({ id: np._id, email: np.email, role: np.role }, config.JWT.secret) }
          return reply(userToken)
        })
        .catch((err) => { return reply(Boom.unauthorized(err.message)) })
    })
    .catch((err) => { return reply(Boom.unauthorized(err.message)) })
}
