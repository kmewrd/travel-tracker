const checkForErrors = (response) => {
  if (!response.ok) {
    window.alert('Oops! Something went wrong. Please try again later.');
  }
}

const checkForServerError = (err) => {
  if (err.message === 'Failed to fetch') {
    window.alert('Oops! Something went wrong. Please try again later.')
  }
}

const fetchData = path => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
}

const postData = (path, data) => {
  return fetch(`http://localhost:3001/api/v1/${path}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(response => checkForErrors(response))
    .catch(err => checkForServerError(err));
}

export {checkForErrors, checkForServerError, fetchData, postData};
