// --------------------------------------------------------------- //
// --------------------------- LOGIN API ------------------------- //
// --------------------------------------------------------------- //
var BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
const USER_URL = BACKEND_URL + '/api/user/';
const LOGIN_URL = USER_URL + 'login';
const LOGOUT_URL = USER_URL + 'logout';
const REGISTER_URL = USER_URL + 'register'

// Login user with given credentials
exports.login = async(user) => {
  return fetch(LOGIN_URL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(user),
    credentials: 'include' // Credentials are required for CORS to recognize user session
  })
  .then(resp => {
    if(!resp.ok) {
      if(resp.status >= 400 && resp.status < 500){
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: 'Error: Server is not responding'};
        throw err;
      }
    }
    return resp.json();
  })
}

// Checks to see if there is a current user session
exports.checkLogin = async() => {
  return fetch(LOGIN_URL, {credentials: 'include'}) // Credentials are required for CORS to recognize user session
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500){
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Error: Server is not responding'};
          throw err;
        }
      }
      return resp.json();
  })
}

// Terminates current user session
exports.logout = async() => {
  return fetch(LOGOUT_URL, {credentials: 'include'}) // Credentials are required for CORS to recognize user session
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500){
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Error: Server is not responding'};
          throw err;
        }
      }
      return resp.json();
  })
}

// Registers a new user
exports.registerUser = async(user) => {
  return fetch(REGISTER_URL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(user),
    credentials: 'include' // Credentials are required for CORS to recognize user session
  })
  .then(resp => {
    if(!resp.ok) {
      if(resp.status >= 400 && resp.status < 500){
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: 'Error: Server is not responding'};
        throw err;
      }
    }
    return resp.json();
  })
}

// Returns the number of registered users
exports.checkRegisteredUsers = async() => {
  return fetch(REGISTER_URL, {credentials: 'include'}) // Credentials are required for CORS to recognize user session
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >= 400 && resp.status < 500){
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Error: Server is not responding'};
          throw err;
        }
      }
      return resp.json();
  })
}

module.exports = exports;