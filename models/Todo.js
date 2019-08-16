const db = require(`../db`)

async function getOne(id){
    try{
        const oneTodo = await db.one(`
            SELECT * FROM todos WHERE id=$1
            `,[id])
        return oneTodo
    }catch(err){
        console.log('Error getting todo');
        console.log(err);
        return {};
    }
}

async function getAll(){
    try{
        const allTodos = await db.any(`
            SELECT * FROM todos
            `)
        return allTodos
    }catch(err) {
        console.log(err);
        return []; //returning an array here because 'getAll normally returns an array of objects
    }
}

async function createTodo(userTodoObj){
    const{priority,task,user_id} = userTodoObj
    try{
        const id = await db.one(`
            INSERT INTO todos
                (priority,task,user_id)
            VALUES
                ($1,$2,$3)
            
            RETURNING id
        `,[priority,task,user_id])
        return id
    }catch(err){
        console.log('Error creating task')
        console.log(err)
        res.send({})
    }
}

// createTodo({
//     priority:1,
//     task: "Go home"
// })

module.exports = {
    getAll,
    getOne,
    createTodo
}