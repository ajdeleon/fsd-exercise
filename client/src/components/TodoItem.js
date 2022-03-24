import React, { useState, useRef } from 'react'

const TodoItem = ({
  id,
  title,
  completed,
  handleRemoveTodo,
  swapCompleted,
  editTodoTitle,
  highlightedRow
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const inputEl = useRef(null)

  const beginEditTodo = () => {
    setIsEditing(!isEditing)
    inputEl.current.focus()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    editTodoTitle(id, newTitle)
  }
  return (
    <div className={`${highlightedRow ? 'bg-cyan-600/10' : 'bg-white'} p-1`}>
      <div className="flex justify-between items-center">
        <input
          type="checkbox"
          onChange={() => swapCompleted(id, completed)}
          checked={completed}
        />
        <form
          onSubmit={handleFormSubmit}
          className={`mr-auto ml-4 w-full border ${!isEditing && 'hidden'}`}
        >
          <input
            type="text"
            className="w-full"
            ref={inputEl}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </form>
        <div
          className={`mr-auto ml-4 ${
            completed ? 'line-through' : 'no-underline'
          } ${isEditing && 'hidden'}`}
        >
          {title}
        </div>
        <button
          onClick={() => beginEditTodo()}
          className="mx-2 text-cyan-600 opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          onClick={() => handleRemoveTodo(id)}
          className="text-cyan-600 opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
    </div>
  )
}

export default TodoItem
