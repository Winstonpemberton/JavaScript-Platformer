const BACKEND_URL = 'localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  getUsers()
})

function getUsers () {
  fetch(`${BACKEND_URL}/users`)
    .then(response => response.json())
    //.then(parsedResponse => console.log(parsedResponse));
}