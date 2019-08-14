const http = require(`http`); //built in node module
const Todo = require(`./models/Todo`)

const server = http.createServer((req,res) =>{
    console.log(`You got a request`)
    const allTodos = Todo.getAll();
    allTodos
        .then((data)=>{
            res.end(JSON.stringify(data));
        })
    
});

server.listen(3000);




 
