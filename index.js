// const http = require(`http`); //built in node module
const express = require(`express`);
//Create the server and call it 'app'
const app = express();
const port = 3000;
const Todo = require(`./models/Todo`);


app.get('/todos', (req, res) => {
    console.log(`You got a request`)
    const allTodos = Todo.getAll();
    allTodos
    .then((data)=>{
        console.log(`Here is the data`)
        console.log(data)
        res.json(data)
        // res.end(JSON.stringify(data));
    })
});

app.get('/todos/:taskId',(req,res) => {
    const theId = parseInt(req.params.taskId, 10)
    const oneTodos = Todo.getOne(theId);
    oneTodos
        .then((data) => {
            res.json(data)
            console.log('is this on?')
        })
});


app.listen(3000);




 
