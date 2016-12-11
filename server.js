'use strict'
// Load modules
const Hapi = require('hapi')
const Hoek = require('hoek')
const hapiAuthJWT = require('hapi-auth-jwt2')
const Good = require('good')
const Swagger = require('hapi-swagger')

// Own modules
const config = require('./configs/config')
const router = require('./routes/router').route
const validate = require('./lib/validate').validate

for (let route of router) {
  route.config.tags = []
  route.config.tags.push('api')
}

const server = new Hapi.Server()
server.connection({ port: 8001 })

server.register([
  require('inert'),
  require('vision'),
  { register: Good, options: config.goodOptions },
  { register: Swagger, options: config.swaggerOptions }
], (err) => {
  Hoek.assert(!err, err)
})

server.register(hapiAuthJWT, (err) => {
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

