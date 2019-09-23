// --------------------------------------------------------------- //
// --------------------------- Website API ----------------------- //
// --------------------------------------------------------------- //
var BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
const WEBSITE_URL = BACKEND_URL + '/api/websites/';

exports.getWebsites = async() => {
  return fetch(WEBSITE_URL, {credentials: 'include'}) // Credentials are required for CORS to recognize user session
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

exports.getWebsite = async(id) => {
  const getURL = WEBSITE_URL + id;
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

exports.searchWebsites = async(query) => {
  const getURL = WEBSITE_URL + 'search/' + query;
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

exports.createWebsite = async(website) => {
  return fetch(WEBSITE_URL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(website),
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

exports.updateWebsite = async(website) => {
  const updateURL = WEBSITE_URL + website._id;

  return fetch(updateURL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(website),
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

exports.removeWebsite = async(id) => {
  const deleteURL = WEBSITE_URL + id;

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