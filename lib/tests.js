let Req = require('./requests').Req
const config = require('../configs/config')
let req = new Req(config)

// == login ==

let user = {
// email: 'admin@gmail.com',
  username: 'vg11',
  password: '!23#'
}

// req.requestToken(user).then(r => console.log(r)).catch(e => console.log(e))

// == register ==

let newUser = {
  user: {
    first_name: 'GOGO',
    last_name: 'GENEV',
    phone_number: '+359099990',
    username: 'vg11',
    password: '!23#',
    confirmed_password: '!23#',
    email: 'gogogenev@gmail.com',
    role: 'User'
  }
  // },
  // location: {
  //   lat: 12.4455,
  //   lng: 23.4553
  // }
}

//req.register(newUser).then(r => console.log(r)).catch(e => console.log(e))

// == change location ==

let location = {
  lat: 51.232,
  lng: 22.212,
  altitude: 145,
  coordinateAccuracy: 3
}

// normal login
req.requestToken(user)
  .then(t => req.requestPutLocation({token: t.token}, location)
    .then((res) => {
      console.log(res)
    }))
  .catch(e => console.log(e))

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

// req.requestToken(user)
//   .then(t => req.requestProfiles({token: t.token})
//     .then((res) => {
//       console.log(res)
//     }))
//   .catch(e => console.log(e))

// req.requestToken(user)
//   .then(t => req.requestUpdateProfile({token: t.token}, newUser.user)
//     .then((res) => {
//       console.log(res)
//     }))
//   .catch(e => console.log(e))

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTkzNWFjNDdiYzA0ZjY3NzEyNDAwZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNDgyMjQxNDUyfQ.9pNH79kPHN-MB0KznqtnY2ANVfubUPlS60QiCaDm8kc'
const notAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NTkzMzg2MTc4ZGU0ZjQzYmM2NTA4YiIsImVtYWlsIjoidXNlckBnbWEuY29tIiwiaWF0IjoxNDgyMjQwOTAyfQ.k8hJxsLT_wGAVgW2ZIj-fN3h25jzNIhQoke-atvQcPQ'

// req.requestChangeRole(adminToken, {userId: "585934da31286ff5722e2bb2", role: 'Administrator'})
// .then(r => console.log(r))
// .catch(e => console.log(e))
