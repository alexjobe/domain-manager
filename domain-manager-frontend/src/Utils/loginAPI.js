// --------------------------------------------------------------- //
// --------------------------- LOGIN API ------------------------- //
// --------------------------------------------------------------- //
const LOGIN_URL = 'http://localhost:8080/login/';
const LOGOUT_URL = 'http://localhost:8080/logout/';

exports.login = async function(user) {
  return fetch(LOGIN_URL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(user),
    credentials: 'include'
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

exports.checkLogin = async function() {
  return fetch(LOGIN_URL, {credentials: 'include'})
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

exports.logout = async function() {
  return fetch(LOGOUT_URL, {credentials: 'include'})
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