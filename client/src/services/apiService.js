import axios from 'axios'

export const getTodos = async () => {
  const { data } = await axios.get('/todos')
  return data
}

export const deleteTodo = async (id) => {
  await axios.delete(`/todos/${id}`)
  return { id }
}

export const editTodo = async (id, body) => {
  const { data } = await axios.patch(`/todos/${id}`, body)
  return data
}

export const createTodo = async (body) => {
  const { data } = await axios.post('/todos', body)
  return data
}
