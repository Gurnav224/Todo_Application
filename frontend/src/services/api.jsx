

const baseUrl = 'http://localhost:3000';

export const api = {
    // create new todo
    createTodo: (newTodo) => {
       return fetch(`${baseUrl}/newtodo`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newTodo)
        })

    },
    // Get All Todos;
    getAllTodos:()=>{
        return fetch(`${baseUrl}/todos`)
    },

 // Delete todo by id
 deleteTodoById: (id) => {
    return fetch(`${baseUrl}/todos/${id}`,{
        method:'DELETE'
    })
 }
}