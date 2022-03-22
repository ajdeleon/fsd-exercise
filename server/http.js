const axios = require('axios').default

const jsonPlaceholderTodos = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos',
  timeout: 5000
})

module.exports = {
  jsonPlaceholderTodos
}
