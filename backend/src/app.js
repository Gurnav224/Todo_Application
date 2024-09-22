const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const todoRouter = require('./routes/Todo.router')


const app = express();

app.use(morgan("dev"))
app.use(express.json())
app.use(cors({origin:"*",credential:true}));

app.use(todoRouter)


app.get('/', (req, res) => {
    res.send('Todo backend is running')
})

module.exports =  app ;