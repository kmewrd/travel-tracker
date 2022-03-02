function fetchData(path) {
  fetch(`http://localhost:3001/api/v1/${path}`)
    .then(response => response.json())
    .then(data => data[path])
    .catch(err => console.log(err));
}

function postData(path, data) {
  fetch(`http://localhost:3001/api/v1/${path}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export {fetchData, postData};
