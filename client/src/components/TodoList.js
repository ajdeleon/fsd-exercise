import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'

import TodoItem from './TodoItem'
import ProgressBar from './ProgressBar'

import {
  getTodos,
  deleteTodo,
  editTodo,
  createTodo
} from '../services/apiService'

const TodoList = () => {
  const alert = useAlert()
  const buttonClasses = 'bg-cyan-600 text-white'
  const [todoInput, setTodoInput] = useState('')
  const [todoItems, setTodoItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTodos()
        setTodoItems(res)
      } catch (e) {
        alert.show("Error fetching data, please refresh the page.")
      }
    }
    fetchData()
  }, [alert])

  const handleTodoInputChange = (e) => {
    setTodoInput(e.target.value)
  }
  const handleTodoSubmit = async (e) => {
    e.preventDefault()
    if (!todoInput) return
    // preventing duplicates to avoid ugly issues with deleting/editing
    if (todoItems.some((todo) => todo.title === todoInput)) {
      setTodoInput('')
      return
    }
    try {
      const res = await createTodo({ title: todoInput, complete: false })

      setTodoItems([...todoItems, res])
      setTodoInput('')
    } catch (e) {
      alert.show("Oops, something went wrong. Please try again")
    }
  }

  const handleRemoveTodo = async (id) => {
    try {
      await deleteTodo(id)
      const updatedTodos = todoItems.filter((todo) => todo.id !== id)
      setTodoItems(updatedTodos)
    } catch (e) {
      alert.show("Oops, something went wrong. Please try again")
    }
  }

  const removeCompleted = async () => {
    try {
      const completedTodosPromises = todoItems
        .filter((todo) => todo.completed)
        .map((todo) => deleteTodo(todo.id))
      await Promise.all(completedTodosPromises)
      const updatedTodos = todoItems.filter((todo) => !todo.completed)
      setTodoItems(updatedTodos)
    } catch (e) {
      alert.show("Oops, something went wrong. Please try again")
    }
  }

  const swapCompleted = async (id, currentState) => {
    try {
      await editTodo(id, { completed: !currentState })
      const updatedTodos = todoItems.map((todo) => {
        // can't use the full response here because jsonplaceholder doesn't really update
        // return todo.id === id ? res : todo // not possible
        return todo.id === id ? { ...todo, completed: !currentState } : todo
      })
      setTodoItems(updatedTodos)
    } catch (e) {
      alert.show("Oops, something went wrong...")
    }
  }

  const editTodoTitle = async (id, newTitle) => {
    try {
      await editTodo(id, { title: newTitle })
      const updatedTodos = todoItems.map((todo) => {
        // can't use the full response here because jsonplaceholder doesn't really update
        // same as above
        return todo.id === id ? { ...todo, title: newTitle } : todo
      })
      setTodoItems(updatedTodos)
    } catch (e) {
      alert.show("Oops, something went wrong...")
    }
  }

  return (
    <div className="flex justify-center p-4 h-full">
      <div className="p-8 bg-white w-8/12 text-center">
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
          {!!todoItems.length &&
            todoItems?.map(({ id, title, completed }, index) => {
              return (
                <TodoItem
                  id={id}
                  title={title}
                  completed={completed}
                  key={title}
                  handleRemoveTodo={handleRemoveTodo}
                  swapCompleted={swapCompleted}
                  editTodoTitle={editTodoTitle}
                  highlightedRow={!!(index % 2)}
                />
              )
            })}
        </div>
        {!!todoItems?.length && (
          <div className="flex justify-between mt-8">
            <ProgressBar todoItems={todoItems} />
            <button
              onClick={() => removeCompleted()}
              className={`${buttonClasses} flex-1 items-center px-2 py-1 mx-2`}
            >
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
    </div>
  )
}

export default TodoList
