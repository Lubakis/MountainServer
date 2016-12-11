const bcrypt = require('bcrypt')
const User = require('../models/user.js').User
const config = require('../configs/config')

module.exports = {
  addUser: function (request, signUpData) {
    return new Promise((resolve, reject) => {
      var user = new User()
      //    var location = new Location()
      Object.assign(user, signUpData)
      //  Object.assign(location, locationData)
      user.password = bcrypt.hashSync(signUpData.password, config.SALT_WORK_FACTOR)
      user.save()
        .then((result) => {
          //  location.save()
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  test: function () {
    console.log('test')
  }
}
