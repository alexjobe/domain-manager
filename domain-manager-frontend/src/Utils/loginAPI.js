// --------------------------------------------------------------- //
// --------------------------- LOGIN API ------------------------- //
// --------------------------------------------------------------- //
var BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
const USER_URL = BACKEND_URL + '/api/user/';
const LOGIN_URL = USER_URL + 'login';
const LOGOUT_URL = USER_URL + 'logout';
const REGISTER_URL = USER_URL + 'register';
const CHANGE_PASS_URL = USER_URL + 'changepassword';

// Login user with given credentials
export async function login(user) {
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
export async function checkLogin() {
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
export async function logout() {
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
export async function registerUser(user) {
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
export async function checkRegisteredUsers() {
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

// Change password
export async function changePassword(passwords) {
  return fetch(CHANGE_PASS_URL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(passwords),
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
