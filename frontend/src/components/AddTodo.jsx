/* eslint-disable react/prop-types */
import { useState , } from "react"
import { api } from "../services/api";

const AddTodo = ({addTodoToList}) => {
    const [newTodo, setNewTodo] = useState({
        title:'',
        description:'',
        completed:'',
        dueDate:''
    })


    const handleChange =  (event) =>{
        const { value, name, checked} = event.target;

        const inputValue = event.target.type === "checkbox" ? checked : value

        setNewTodo({...newTodo,[name]:inputValue})

    }


    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await api.createTodo(newTodo);
    
            if (!response.ok) {
                throw new Error('Failed to create todo');
            }
    
            const createdTodo = await response.json();  // Get the newly created todo from response

            console.log('new todo added successfully',createdTodo)
    
            addTodoToList(createdTodo.newTodo)

        } catch (error) {
            console.error('Error adding new todo:', error);
        }
    };
    

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Todo Title: </label>
        <input 
        type="text" 
        id="title" 
        name="title" 
        value={newTodo.title}
         onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input 
        type="text" 
        id="description"
         name="description" 
         onChange={handleChange}
          />
      </div>
      <div>
        <input 
        type="checkbox" 
        name="completed" 
        id="completed" 
        onChange={handleChange}
         />
        <label htmlFor="completed">Compeleted: </label>
      </div>
      <div>
        <label htmlFor="dueDate">Due Date: </label>
        <input 
        type="date" 
        id="dueDate" 
        name="dueDate" 
        onChange={handleChange}

        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default AddTodo
