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
    .then(response => response.json())
    .catch(err => console.log(err));
}

export {fetchData, postData};
