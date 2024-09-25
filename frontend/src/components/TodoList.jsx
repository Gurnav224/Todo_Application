

import { useEffect, useState } from "react"
import AddTodo from '../components/AddTodo'
import { api } from "../services/api";

const TodoList = () => {


  const [todos, setTodos ] = useState([]);



useEffect(()=>{
api.getAllTodos()
.then((response) => response.json())
.then((data) => setTodos(data.todos))
},[])
 

const AddTodoToList = (newTodo) =>{
  setTodos([newTodo, ...todos])
}


const handleDelete = async (todoId) => {
 try {
  const response = await api.deleteTodoById(todoId);
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
 
  setTodos(todos.filter((todo) => todo._id !== todoId));
  console.log('todo deleted successfully')

 } catch (error) {
  console.log('failed to delete todo',error)
 }
}
  
  return (
    <>
    <AddTodo  addTodoToList={AddTodoToList}/>

    <ul>
    {
    todos.map((todo) => (
      <li key={todo._id}>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p>{todo.completed ? "completed" : "Not completed"}</p>
        <p>{todo.dueDate}</p>
        <button>Edit</button>
        <button onClick={() => handleDelete(todo._id)}>Delete</button>
      </li>
    ))
    }
    </ul>
    </>

  )
}

export default TodoList
