//1. Collect and prep the ingredients 
const db = require(`../db`)

//2. Cook
async function getAll(){
    try {
    const users = await db.any(`
        SELECT * FROM users
        `)
    return users
    } catch(err) {
        console.log("There was an error retreiving user")
        console.log(err)
        return {
            id: 0,
            displayname: 'No user found'
        }
    }
};

async function getOne(id){
    try{
    const user = await db.one(`
    SELECT * FROM users WHERE id=$1
    `,[id]);
    const todosForUser = await db.any(`
    SELECT * FROM todos WHERE user_id=$1
    `,[id]);
    user.todos = todosForUser;
    return user;
    } catch(err) {
        console.log('Error getting user')
        console.log(err)
        return {}
    }
}

//Accept and object as an argument so we have more felxability later 
//on w/o having to update our function calls (ie. adding db columns)
async function createUser(userDataobj){
    //destructuring the arg value -> picking two values from obj
    const {displayname,username} = userDataobj 
    try{
        const id = await db.one(`
        INSERT INTO users
            (displayname,username)
        VALUES
            ($1,$2)

        RETURNING id
        `,[displayname,username]);

        console.log(id)
        return id //db creates a user, therefore creates an id that we can return 
    } catch(err) {
        console.log('didnt work')
        console.log(err)
    }
}

//3. Serve
module.exports = {
    getAll,
    getOne,
    createUser
};



// //CODE BELOW IS WRITTEN USING .then NOTATION INSTEAD OF ASYNC
//     .then((user) => {
//         //get the Todos for this user
//         const todos = db.any(`
//         SELECT * FROM todos WHERE user_id=$1
//         `,[id])
    
//         .then((todosForUser) => {
//             console.log(todosForUser)
//             user.todos = todosForUser
//             return user
//         })
//     return todos
//     })
//     .catch((err) => {
//         console.log("Error getting user")
//         console.log(err)
//     })
// };