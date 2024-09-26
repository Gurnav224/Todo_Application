

const Todo = require('../models/Todo.model');


const TodoController = {
    createTodo: async function (req, res) {
        const { title, description, completed ,dueDate} = req.body;
        try {
          const newTodo = new Todo({
            title: title,
            completed: completed,
            description: description,
            dueDate:dueDate
          });
          const savedTodo = await newTodo.save();
          res
            .status(201)
            .json({ message: "todo created successfully", newTodo: savedTodo });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "error to create new todo" });
        }
      },
    
      getAllTodos: async function (req, res) {
        try {
          const todos = await Todo.find({});
          if (todos.length !== 0) {
            res.status(200).json({ message: "get all todos", todos });
          } else {
            res.status(500).json({ error: "todos not found" });
          }
        } catch (error) {
          console.error("error", error);
          res.status(500).json({ error: "failed to get todos" });
        }
      },
    
      getTodoById: async function (req, res) {
        const { id } = req.params;
        try {
          const todo = await Todo.findById(id);
          if (todo) {
            res.status(200).json({ message: "todo get by id successfully", todo });
          } else {
            res.status(400).json({ message: "failed to get single todo" });
          }
        } catch (error) {
          console.error("error", error);
          res.status(500).json({ error: "failed to get todo by id" });
        }
      },
      
      updateTodo: async function(req, res){
        const {id} = req.params;
        const {title,description, completed} = req.body;
        console.log(id)
        console.log(title,description,completed,dueDate)
        try {
            const todo = await Todo.findByIdAndUpdate({_id:id},{title,description,completed,dueDate}, {new:true});

            if(todo){
                res.status(200).json({message:'todo updated successfully',updated:todo})
            }
            else{
                res.status(400).json({message:'failed to update tood'})
            }
        } catch (error) {
            console.error('updating todo error',error)
            res.status(500).json({error:'server error'})
        }
      },

      deleteTodo: async function(req , res){
        const {id} = req.params;
        try {
            const todo = await Todo.findByIdAndDelete(id);
            if(todo){
              res.status(200).json({message:"todo delete successfully"})
            }
            else{
              res.status(400).json({error:"todo not foudn"})
            }
        } catch (error) {
          console.error('error to delete todo',error)
          res.status(500).json({error:'server error'})
        }
      }
}


module.exports = TodoController