const db = require(`../db`)

function getOne(id){
    db.one(`
    SELECT * FROM todos WHERE id=$1
    `,[id])
    .then((data)=> {
        console.log('Here is the data')
        console.log(data)
    })//pass a callback to a .then 
    .catch((err)=>{
        console.log(err)
    })//pass a callback to a .catch
}

function getAll(){
    return db.any(`
        SELECT * FROM todos
        `)
        // .then((data)=> {
        //     console.log('Here is the data')
        //     console.log(data)
        // })//pass a callback to a .then 
        .catch((err)=>{
            console.log(err)
        })//pass a callback to a .catch
}

module.exports = {
    getAll,
    getOne,
}