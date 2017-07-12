/* global axios */

axios.get('//jsonplaceholder.typicode.com/posts')
  .then(response => response)
  .catch(error => console.dir(error));
