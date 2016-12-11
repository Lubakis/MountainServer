let Req = require('./requests').Req
const config = require('../configs/config')
let req = new Req(config)

// == login ==

let user = {
//  email: 'vgenev@dmail.com',
  username: 'vgenev',
  password: '!23$'
}

// req.requestToken(user).then(r => console.log(r)).catch(e => console.log(e))

// == register ==

let newUser = {
  user: {
    first_name: 'Valentin',
    last_name: 'Genev',
    phone_number: '+359099990',
    username: 'vgenev',
    password: '!23$',
    confirmed_password: '!23$',
    email: 'vgenev@dmail.com',
    role: 'User'
  },
  location: {
    lat: 12.4455,
    lng: 23.4553
  }
}

// req.register(newUser).then(r => console.log(r)).catch(e => console.log(e))

// == change location ==

let location = {
  lat: 51.232,
  lng: 22.212
}

// normal login
// req.requestToken(user)
//   .then(t => req.requestPutLocation({token: t.token}, location)
//     .then((res) => {
//       console.log(res)
//     }))
//   .catch(e => console.log(e))

// fb login
// req.requestFbLogin(fbToken)
//   .then(t => req.requestPutLocation({token: t.token}, location)
//     .then((res) => {
//       console.log(res)
//     }))
//   .catch(e => console.log(e))

const fbToken = 'EAAJwnGZAfhrABANOL0d6nkgpTKMb8Sk5vXPZCHX6piZC41wV7IEnhCgZBTbOxstn7nt5di03KAYem2IdtpHMoZBHIi4nt4BYrJrSZAdhW6PCuys93zAV7WfSl9J1bAridZCOViZAvOmQpb4cXMW3UiZCK7t32xoNf6xBZCHuQKfW2MDwZDZD'

// req.requestFbLogin(fbToken).then(r => console.log(r)).catch(e => console.log(e))

let fbUser = {
  fb_token: fbToken,
  role: 'User',
  location: location
}

// req.requestFbRegister(fbUser).then(r => console.log(r)).catch(e => console.log(e))

req.requestToken(user)
  .then(t => req.requestProfiles({token: t.token})
    .then((res) => {
      console.log(res)
    }))
  .catch(e => console.log(e))

