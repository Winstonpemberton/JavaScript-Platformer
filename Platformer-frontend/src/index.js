const BACKEND_URL = 'localhost:3000';

document.addEventListener('DOMContentLoaded', () => (console.log("loaded")))
fetch(`${BACKEND_URL}/`)
  .then(response => response.json())
  .then(parsedResponse => console.log(parsedResponse));