import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import { api } from "../services/api";

import moment from "moment";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    completed: "",
    dueDate: "",
  });

  useEffect(() => {
    api
      .getAllTodos()
      .then((response) => response.json())
      .then((data) => setTodos(data.todos));
  }, []);

  const AddTodoToList = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleDelete = async (todoId) => {
    try {
      const response = await api.deleteTodoById(todoId);
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos(todos.filter((todo) => todo._id !== todoId));
      console.log("todo deleted successfully");
    } catch (error) {
      console.log("failed to delete todo", error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo._id);
    setEditForm({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      dueDate: todo.dueDate,
    });
  };

  const handleEditFormChange = (event) => {
    const { value, checked, type, name } = event.target;

    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedTodo = { ...editForm, _id: editingTodo };
      const response = await api.updateTodoById(editingTodo, updatedTodo);

      if (!response.ok) {
        throw Error("failed to udpate todo , Network Error");
      }



      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === editingTodo ? updatedTodo : todo
        )
      );

      setEditingTodo(null);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  return (
    <>
      <AddTodo addTodoToList={AddTodoToList} />

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingTodo === todo._id ? (
              <form onSubmit={handleEditFormSubmit}>
                <div>
                  <label htmlFor="title">Todo Title: </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description: </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditFormChange}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={editForm.completed}
                    onChange={handleEditFormChange}
                  />
                  <label htmlFor="completed">Compeleted: </label>
                </div>
                <div>
                  <label htmlFor="dueDate">Due Date: </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={
                      editForm.dueDate
                        ? new Date(editForm.dueDate).toISOString().substr(0, 10)
                        : ""
                    }
                    onChange={handleEditFormChange}
                  />
                </div>
                <button type="submit">Update Todo</button>
                <button onClick={() => setEditingTodo(false)}>Cancel</button>
              </form>
            ) : (
              <>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p>{todo.completed ? "completed" : "Not completed"}</p>
                <p>{moment(todo.dueDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
