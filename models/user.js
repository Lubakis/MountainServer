'use strict'
// first_name, last_name, email_address, phone_number, password, username,
// location (latitude, longitude), role:Role Object, facebook_linked, twitter_linked, google_linked

const Mongoose = require('../lib/database').Mongoose
const db = require('../lib/database').db
const roles = ['Administrator', 'MointainDispatcher', 'MountainRescuer', 'User']

const userSchema = new Mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String },
  email: { type: String, unique: true, required: true },
  location: {lat: Number, lng: Number},
  role: {type: String, enum: roles},
  fb_linked: {type: String},
  google_linked: {type: String},
  twitter_linked: {type: String}
})

userSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`
})

// const locationSchema = new Mongoose.Schema({
//   lat: {type: Number, required: true},
//   lng: {type: Number, required: true},
//   last_seen: {type: Date, default: Date.now},
//   _user: {type: Number, ref: 'User'}
// })

// const Location = db.model('Location', locationSchema, 'Locations')

const User = db.model('User', userSchema, 'Users')

module.exports = {
  User: User,
  Roles: roles // ,
  // Location: Location
}
