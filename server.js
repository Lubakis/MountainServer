'use strict'
// Load modules
const Hapi = require('hapi')
const Hoek = require('hoek')

// Own modules
const config = require('./configs/config')
const router = require('./routes/router').route
const validate = require('./lib/validate')

for (let route of router) {
  route.config.tags = []
  route.config.tags.push('api')
}

const server = new Hapi.Server()
server.connection({ port: 8001 })

server.register([
  require('inert'),
  require('vision'),
  require('hapi-auth-jwt2'),
  { register: require('good'), options: config.goodOptions },
  { register: require('hapi-swagger'), options: config.swaggerOptions }
], (err) => {
  Hoek.assert(!err, err)
  server.auth.strategy('jwt', 'jwt',
    { key: config.JWT.secret,
      validateFunc: validate,
      verifyOptions: { ignoreExpiration: true },
      headerKey: 'authentication-token'
    })
  server.auth.default('jwt')
  server.route(router)
  server.start((err) => {
    Hoek.assert(!err, err)
    console.log('Server started at:', server.info.uri)
  })
})

