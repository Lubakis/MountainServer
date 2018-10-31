'use strict'

const Mongoose = require('../lib/database').Mongoose
const db = require('../lib/database').db

const locationSchema = new Mongoose.Schema({
  lat: Number,
  lng: Number,
  altitude: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  coordinateAccuracy: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  _user: {
    type: Mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Location = db.model('Location', locationSchema, 'Locations')

module.exports = {
  Location: Location
}
