const checkForErrors = (response) => {
  if (!response.ok) {
    window.alert('Oops! Something went wrong. Please refresh the page or try again later.');
  }
}

const handleServerError = (err) => {
  if (err.message === 'Failed to fetch') {
    window.alert('Oops! Something went wrong. Please refresh the page or try again later.')
  }
}

const fetchData = path => {
  return fetch(`http://localhost:3001/api/v1/${path}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => handleServerError(err));
}

const postData = (path, data) => {
  return fetch(`http://localhost:3001/api/v1/${path}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(response => checkForErrors(response))
    .catch(err => handleServerError(err));
}

export {checkForErrors, handleServerError, fetchData, postData};
