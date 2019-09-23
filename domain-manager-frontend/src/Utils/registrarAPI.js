// --------------------------------------------------------------- //
// -------------------------- Registrar API ---------------------- //
// --------------------------------------------------------------- //
var BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
const REGISTRAR_URL = BACKEND_URL + '/api/registrars/';

exports.getRegistrars = async() => {
  return fetch(REGISTRAR_URL, {credentials: 'include'}) // Credentials are required for CORS to recognize user session
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

exports.searchRegistrars = async(query) => {
  const getURL = REGISTRAR_URL + 'search/' + query;
  return fetch(getURL, {credentials: 'include'}) // Credentials are required for CORS to recognize user session
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

exports.createRegistrar = async(registrar) => {
  return fetch(REGISTRAR_URL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(registrar),
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

exports.updateRegistrar = async(registrar) => {
  const updateURL = REGISTRAR_URL + registrar._id;

  return fetch(updateURL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(registrar),
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

exports.removeRegistrar = async(id) => {
  const deleteURL = REGISTRAR_URL + id;

  return fetch(deleteURL, {
    method: 'delete',
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

module.exports = exports;