'use strict'
// first_name, last_name, email_address, phone_number, password, username,
// location (latitude, longitude), role:Role Object, facebook_linked, twitter_linked, google_linked

const Mongoose = require('../lib/database').Mongoose
const db = require('../lib/database').db
const roles = ['Administrator', 'MointainDispatcher', 'MountainRescuer', 'User']

const locationModel = {
}

const userSchema = new Mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String },
  username: { type: String, index: true, unique: true, sparse: true },
  password: { type: String },
  email: { type: String, unique: true, required: true },
  location: locationModel,
  role: {type: String, enum: roles},
  fb_linked: {type: String},
  google_linked: {type: String},
  twitter_linked: {type: String}
})

userSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`
})


const User = db.model('User', userSchema, 'Users')

module.exports = {
  User: User,
  Roles: roles
}
