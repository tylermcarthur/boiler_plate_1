const express = require('express')
const PORT = process.env.PORT || 8000
const pool = require('./db_connection.js')

// our server container
const app = express();

// middleware 
app.use(express.json()) // lets us read incoming req.body data as json
app.use(express.static('public'));

// create 
app.post('/api/public', async (req,res)=>{
    try {
        const {name,password,email} = req.body;
        const user = await pool.query(
            "INSERT INTO users (name,password,email) VALUES ($1,$2,$3)",
            [name,password,email]
            );
            res.json('User has been inserted into the databse')
    } catch (err) {
        console.error(err.message)
    }
});
//read one
app.get('/api/public/:id', async(req,res)=>{
    try {
        let {id} = req.params
        const specificUser = await pool.query("SELECT * FROM users WHERE user_id = $1",[id])
        res.json(specificUser.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
//read all
app.get('/api/public', async(req,res)=>{
    try {
        const allUsers = await pool.query("SELECT * FROM users")
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message)
    }
})
//update
app.patch('/api/public/', async (req,res)=>{
    try {
        let {id,name,password,email} = req.body
        const specificUser = await pool.query("SELECT * FROM users WHERE user_id = $1",[id])
        const template = {
            user_id : specificUser.rows[0].user_id,
            name : name || specificUser.rows[0].name,
            password : password || specificUser.rows[0].password,
            email : email || specificUser.rows[0].email,
            created_on : specificUser.rows[0].created_on
        }
        const updateUser = await pool.query(
            "UPDATE users SET (user_id,name,password,email,created_on) = ($1,$2,$3,$4,$5) WHERE user_id = $6 RETURNING *",
            [template.user_id,template.name,template.password,template.email,template.created_on,id]
        );
        res.json(updateUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
//delete
app.delete('/api/public/', async(req,res)=>{
  try {
        let {name} = req.body
        const specificUser = await pool.query("DELETE FROM users WHERE name = $1",[name])
      res.json("This user has been deleted")
  } catch (err) {
      console.error(err.message)
  }
})

// causes our server to listen for incoming reuqests to this port
app.listen(PORT, ()=>{
    console.log(`LISTINING ON PORT ${PORT}`)
});