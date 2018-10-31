'use strict'
const Mongoose = require('mongoose')
const db = Mongoose.connection
const config = require('../configs/config')

Mongoose.Promise = global.Promise
Mongoose.connect(`mongodb://${config.mongo.url}/${config.mongo.database}`)

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function callback () {
  console.log('Connection with database succeeded.')
})

exports.Mongoose = Mongoose
exports.db = db
