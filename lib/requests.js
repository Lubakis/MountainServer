'use strict'
const request = require('request')

class Req {
  constructor (config) {
    this.config = config
    this.requestData = (object) => {
      return new Promise((resolve, reject) => {
        request(object, (e, r, body) => {
          if (!e && r.statusCode === 200) {
            let oBody = JSON.parse(body)
            resolve(oBody)
          } else {
            if (!e) {
              reject(new Error(`statusCode : ${r.statusCode}
                                body: ${r.body}`))
            } else {
              reject(new Error(`Error: ${e}`))
            }
          }
        })
      })
    }
  }

  requestToken (obj) {
    return new Promise((resolve, reject) => {
      let loginRequest = {
        method: 'POST',
        url: `${this.config.apiURL}/login`,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      }
      this.requestData(loginRequest)
        .then((token) => resolve(token))
        .catch((e) => reject(e))
    })
  }

  requestFbVerifyToken (fbToken) {
    return new Promise((resolve, reject) => {
      let fbRequest = {
        method: 'GET',
        url: `${this.config.credentials.facebook.verificationURI}=${fbToken}`
      }

      this.requestData(fbRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }

  requestFbSignUpToken (fbToken) {
    return new Promise((resolve, reject) => {
      let fbSingUpRequest = {
        method: 'GET',
        url: `${this.config.credentials.facebook.verificationURI}=${fbToken}&fields=name,email`
      }
      this.requestData(fbSingUpRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }

  // === TEST ===

  requestProfiles (token) {
    return new Promise((resolve, reject) => {
      let getProfilesRequest = {
        method: 'GET',
        url: `${this.config.apiURL}/profiles`,
        headers: {
          'content-type': 'application/json',
          'Authentication-Token': `${token.token}`
        }
      }

      this.requestData(getProfilesRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }

  requestFbLogin (fbToken) {
    return new Promise((resolve, reject) => {
      let fbSignInRequest = {
        method: 'POST',
        url: `${this.config.apiURL}/login/facebook`,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          fb_token: fbToken
        })
      }
      this.requestData(fbSignInRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }

  requestFbRegister (userdata) {
    return new Promise((resolve, reject) => {
      let userFbSingUpRequest = {
        method: 'POST',
        url: `${this.config.apiURL}/register/facebook`,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(userdata)
      }

      this.requestData(userFbSingUpRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }

  register (user) {
    return new Promise((resolve, reject) => {
      let loginRequest = {
        method: 'POST',
        url: `${this.config.apiURL}/register`,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      }
      this.requestData(loginRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }

  requestUpdateProfile (token, user) {
    return new Promise((resolve, reject) => {
      let loginRequest = {
        method: 'POST',
        url: `${this.config.apiURL}/profile/update`,
        headers: {
          'content-type': 'application/json',
          'Authentication-Token': `${token.token}`
        },
        body: JSON.stringify(user)
      }
      this.requestData(loginRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }

  requestChangeRole (adminToken, obj) {
    return new Promise((resolve, reject) => {
      let loginRequest = {
        method: 'POST',
        url: `${this.config.apiURL}/set-role`,
        headers: {
          'content-type': 'application/json',
          'Authentication-Token': `${adminToken}`
        },
        body: JSON.stringify(obj)
      }
      this.requestData(loginRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }


  requestPutLocation (token, location) {
    return new Promise((resolve, reject) => {
      let locationRequest = {
        method: 'PUT',
        url: `${this.config.apiURL}/location`,
        headers: {
          'content-type': 'application/json',
          'Authentication-Token': `${token.token}`
        },
        body: JSON.stringify(location)
      }
      this.requestData(locationRequest)
        .then((result) => resolve(result))
        .catch((e) => reject(e))
    })
  }
}

module.exports = {Req: Req}
