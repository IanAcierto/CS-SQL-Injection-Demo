const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const app = express()
app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = new sqlite3.Database(':memory:')
db.serialize(function(){
  db.run("CREATE TABLE user (username TEXT, password TEXT, title TEXT)");
  db.run("INSERT INTO user VALUES('privilegedUser', 'privilegedUser1' 'Administrator')")
})

app.get('/', function(req, res) {
  res.sendFile('index.html')
})

app.post('/login', function(req, res) {
  const username = req.body.username
  const password = req.body.password
  const query = "SELECT title FROM user where username = '" + username + "' and password = '" + password + "'"

  db.get(qurey, function(err, row){
    if(err){
      console.log('ERROR', err)
      res.redirect("/index.html#error")
    }else if (!row){
      res.redirect("/index.html#unauthorized")
    }else{
      res.send("LOGIN SUCCESSFUL")
    }
  })
})