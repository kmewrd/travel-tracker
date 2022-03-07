const checkForErrors = (response) => {
  if (response.ok) {
    console.log('Trip successfully posted.', response);
  } else {
    console.log('Something went wrong.', response);
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
    .catch(err => console.log(err));
}

export {fetchData, postData};
