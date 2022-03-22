import React, { useState } from 'react'

import TodoItem from './TodoItem'
import ProgressBar from './ProgressBar'

const TodoList = () => {
  const buttonClasses = 'bg-cyan-600 text-white'
  const [todoInput, setTodoInput] = useState('')
  const [todoItems, setTodoItems] = useState([
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: true
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false
    }
  ])

  const handleTodoInputChange = (e) => {
    setTodoInput(e.target.value)
  }
  const handleTodoSubmit = (e) => {
    e.preventDefault()
    if (!todoInput) return
    setTodoItems([...todoItems, { title: todoInput, completed: false }])
    setTodoInput('')
  }

  const removeTodo = (title) => {
    const updatedTodos = todoItems.filter((todo) => todo.title !== title)
    setTodoItems(updatedTodos)
  }

  const removeCompleted = () => {
    const updatedTodos = todoItems.filter(todo => !todo.completed)
    setTodoItems(updatedTodos)
  }

  const swapCompleted = (title) => {
    console.log(title)
    const updatedTodos = todoItems.map((todo) => {
      return todo.title === title
        ? { ...todo, completed: !todo.completed }
        : todo
    })
    setTodoItems(updatedTodos)
  }

  return (
    <div className="p-8 bg-white w-8/12 text-center my-4 h-min">
      <h1 className="font-semibold">TODOLIST</h1>
      <form onSubmit={handleTodoSubmit} className="flex m-2">
        <input
          type="text"
          value={todoInput}
          onChange={handleTodoInputChange}
          className="flex-1 border border-yellow-400 mr-2"
        />
        <input
          type="submit"
          value="+"
          className={`${buttonClasses} px-3 py-1`}
        />
      </form>
      <div className="divide-y">
        {todoItems.map(({ id, title, completed }) => {
          return (
            <TodoItem
              id={id}
              title={title}
              completed={completed}
              key={title}
              removeTodo={removeTodo}
              swapCompleted={swapCompleted}
            />
          )
        })}
      </div>
      {!!todoItems.length && (
        <div className="flex justify-between mt-8">
          <ProgressBar todoItems={todoItems} />
          <button onClick={() => removeCompleted()} className={`${buttonClasses} px-2 py-1 flex-1 mx-2`}>
            Remove checked{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default TodoList
