// const http = require(`http`); //built in node module
const express = require(`express`);
//Create the server and call it 'app'
const app = express();

//Use urlencoded middleware
// to POST buddies
// look at docs on urlencoded for details
app.use(express.urlencoded({extended: true}))

//Create a variable for port#
const port = 4000;


app.get('/', (req,res) => {
    res.render('index', {
        locals: {
            message: "It is time for lunch"
        },
        partials: {
            navbar: 'navbar'
        }
    }); //tell the res.render the name of the view file; here it is 'index' for index.html
})
const Todo = require(`./models/Todo`);
const user = require(`./models/User`);
const {sanitizeBody} = require('express-validator');
const es6Renderer = require('express-es6-template-engine');

app.engine('html',es6Renderer);
//Telling 
app.set('views','views');
app.set('view engine','html');

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

app.get(`/users`, async (req,res)=>{
    const allUsers = await user.getAll()
    res.json(allUsers)
        // .then((data) => {
        //     res.json(data)
        // })
});

app.get(`/users/:userId`,(req,res) => {
    const theId = parseInt(req.params.userId, 10)
    const aUser = user.getOne(theId)
    aUser
        .then((data) => {
            res.json(data)
        })
})

app.post(`/users`, [
    sanitizeBody('username').escape(),
    sanitizeBody('displayname').escape()
] ,async (req,res) => {
    //ADD USER
    console.log('we got a POST request');
    res.send("good job");
    const newUserInfo = await user.createUser(req.body)
})
console.log(Todo)
app.use(`/users/:userId/todos`, async (req,res) => {
    console.log('Trying to add a task')
    const user_id = parseInt(req.params.userId,10)
    const {priority,task} = req.body
    const newUserTask = await Todo.createTodo({
        user_id,
        priority,
        task
    })
    res.json(newUserTask)
});


app.listen(port);




 
