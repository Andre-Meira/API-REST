const client = require('../models/client');
const express = require('express');
const router = express.Router();

router.post("/register", (req, res)=> {
    client.connect(function(err){
        if(err){
            return console.info('Connexion error', err);
        }
    })    
    const query = "insert into info_user(name, age, city, state, country) Values($1,$2,$3,$4,$5)"
    const body = {
        "name": req.body.name,
        "Age": req.body.Age,
        "City": req.body.City,
        "state": req.body.state,
        "country": req.body.countr
    }
    client.query(query, [body.name, parseInt(body.Age), body.City, body.state, body.country])
        .then(()=> {console.info('Insert Sucess')})
        .catch((err) => {console.error(err)})
})

router.get("/search", async (req, res)=>{
    client.connect((err, client, release) => {
        if(err){
          return console.error('Error in client', err.stack)
        }
        client.query("select * from info_user", (err, result) => {
          release()          
          if (err){
            return console.error('Error executing query', err.stack)
          }
          else{
            res.send(result.rows);
          }
        
        })
    })
})

module.exports = app => app.use("/auth",router);