import React, { useEffect } from 'react'
import { useState } from 'react'
import './Todo.css'

const Todo = () => {
      const [todos, setTodos] = useState(() => {
            const savedTodos = localStorage.getItem('todos');
            return savedTodos ? JSON.parse(savedTodos) : [];
      });
      const [inputValue, setInputValue] = useState({
            title: "",
            desc: ""
      })

      useEffect(() => {
            localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const handleSubmit = (e)=>{
            e.preventDefault()
            if (!inputValue.title.trim()) return; 
            setTodos(p=>{
                  return [...p, {...inputValue, id: Math.random()}]
            })
            setInputValue({
                  title: "",
                  desc: ""
            })
      }

      const onChangeHandler = (e)=>{
            const {name, value} = e.target;
            setInputValue(p => ({ ...p, [name]: value }))
      }

      const removeTodo = id => {
            setTodos(todos.filter(todo => todo.id != id))
      }

  return (
    <div className="todo-container">
      <h2 className="todo-header">Todo List</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
            <input
                  className="todo-input"
                  type="text"
                  name='title'
                  value={inputValue.title}
                  onChange={onChangeHandler}
                  placeholder='Enter Title'
                  required
            />

            <input
                  className="todo-input"
                  type="text"
                  name='desc'
                  value={inputValue.desc}
                  onChange={onChangeHandler}
                  placeholder='Enter Description'
            />

            <button className="todo-button" type='submit'>Add Todo</button>
      </form>

      <div className="todo-list">
            {todos.map((todo)=>{
                  return <div key={todo.id} className="todo-item">
                        <button 
                              className="delete-button"
                              onClick={()=>removeTodo(todo.id)}
                        >
                              ×
                        </button>
                        <h3 className="todo-title">{todo.title}</h3>
                        <p className="todo-desc">{todo.desc}</p>
                  </div>
            })}
      </div>
    </div>
  )
}

export default Todo
