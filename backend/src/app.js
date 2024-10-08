const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const todoRouter = require('./routes/Todo.router')


const app = express();

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))



const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };

app.use(cors(corsOptions));

app.use((req, res, next) => {

res.header('Access-Control-Allow-Origin', '*');

res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

next();

});


app.use(todoRouter)


app.get('/', (req, res) => {
    res.send('Todo backend is running')
})

module.exports =  app ;