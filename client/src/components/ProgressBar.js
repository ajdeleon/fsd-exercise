import React from 'react'

const ProgressBar = ({ todoItems }) => {
  const completedTodos = todoItems.filter((todo) => todo.completed).length
  const totalTodos = todoItems.length
  const completedPercentage = (completedTodos / totalTodos) * 100

  return (
    <div className="flex-1 mx-2 border relative">
      <div
        className="absolute inset-0 bg-red-500"
        style={{ width: `${completedPercentage}%` }}
      ></div>
      <div className="absolute inset-0 py-1 px-2">
        {completedTodos} of {totalTodos} tasks done
      </div>
    </div>
  )
}

export default ProgressBar
