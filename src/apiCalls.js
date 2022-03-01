function fetchData(path) {
  fetch(`http://localhost:3001/api/v1/${path}`)
    .then(response => response.json())
    .catch(err => console.log(err);
}

function postData(data, url) {

}

export default {fetchData, postData};
