const client = require('../models/client');
const express = require('express');
const { query } = require('express');
const router = express.Router();

router.post("/register", (req, res)=> {
  const query = "insert into info_user(name, age, city, state, country) Values($1,$2,$3,$4,$5)"
  const body = {
        "name": req.body.name,
        "Age": req.body.Age,
        "City": req.body.City,
        "state": req.body.state,
        "country": req.body.countr
  }

  client.connect(function(err){
    if(err){
      return console.info('Connexion error', err);
    }
    })    
    
    client.query(query, [body.name, parseInt(body.Age), body.City, body.state, body.country])
      .then(()=> {console.info('Insert Sucess')})
      .catch((err) => {console.error(err)})
})

router.get("/search", async (req, res)=>{
  client.connect((err, client, release) => {
      if(err){
        return console.error('Error in client', err.name)
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

router.post("/update", async (req, res) => {
  const query = "UPDATE info_user SET name = $2,age = $3, city = $4, state = $5, country = $6 WHERE id = $1;"
  const body = {
    "id":req.body.id,
    "name": req.body.name,
    "Age": req.body.Age,
    "City": req.body.City,
    "state": req.body.state,
    "country": req.body.country
  }
  client.connect((err) => {
    if(err){
      return console.error("Error in client", err.name)
    }

    client.query(query, [body.id, body.name, parseInt(body.Age), body.City, body.state, body.country])
      .then(()=> {console.info('Update Sucsess!!')})
      .catch((err) => {console.error(err)})
    })
})

router.delete("/delete", async(req,res) => {
  const query = "DELETE FROM info_user where id = $1";
  const body = req.body.id;
  client.query(query, body)
    .then(()=> {console.info("Delete Success!!")})
    .catch((err) => {console.error(err)})
})

module.exports = app => app.use("/auth",router);