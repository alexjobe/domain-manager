// --------------------------------------------------------------- //
// ----------------------------- Host API ------------------------ //
// --------------------------------------------------------------- //
const HOST_URL = 'http://localhost:8080/api/hosts/';

exports.getHosts = async() => {
  return fetch(HOST_URL, {credentials: 'include'}) // Credentials are required for CORS to recognize user session
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

exports.searchHosts = async(query) => {
  const getURL = HOST_URL + 'search/' + query;
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

exports.createHost = async(host) => {
  return fetch(HOST_URL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(host),
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

exports.updateHost = async(host) => {
  const updateURL = HOST_URL + host._id;

  return fetch(updateURL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(host),
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

exports.removeHost = async(id) => {
  const deleteURL = HOST_URL + id;

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