import { useState, useEffect } from 'react'
import ToDo from './Todo.js'
import ToDoForm from './Todoform.js'

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")))
  const addTask = (userInput) => {
    if(userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        complete: false
      }
      setTodos([...todos, newItem])
    }
  }
  useEffect(() => {
    updateLocal()
  })
  function updateLocal() {
     localStorage.setItem("todos", JSON.stringify(todos))
  };

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
  }

  const checkStorage = () => {
    alert(localStorage.getItem("todos"))
  }

  return (
    <div className="App">
      <header>
        <h1>Список задач: {todos.length}</h1>
      </header>
      <button onClick={checkStorage}>Check Storage</button>
      <ToDoForm updateLocal={updateLocal} addTask={addTask} />
      {todos.map((todo) => {
        return (
          <ToDo
            todo={todo}
            key={todo.id}
            toggleTask={handleToggle}
            removeTask={removeTask}
            />
        )
      })}
    </div>
  );
}

export default App;
