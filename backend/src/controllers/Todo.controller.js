const TodoController = {
  createTodo: async function (req , res) {
    res.send('create todo')
  },
  getAllTodos: async function (req ,res) {
    res.send('get all todos')
  },
  getTodoById: function (req ,res) {
    res.send('get todo by id')
  },
  updateTodo: function (res , res) {
    res.send('update tood by id')
  },
  deleteTodo: function (req , res) {
    res.send('delete todo')
  },
};

module.exports = TodoController;
