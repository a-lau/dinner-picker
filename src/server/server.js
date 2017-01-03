const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('foodList.db');

// Setting up parsing of post data
const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// This responds a GET request for /list_food.
app.get('/api/v1/list_food', function (req, res) {
  db.all('SELECT * FROM foodlist', function(err, row) {
    res.send(JSON.stringify(row));
  });
})

app.post('/api/v1/add_food', function (req, res) {
  //do something with req and db
  console.log("add post");
  console.log(req.body.name);
})

app.post('/api/v1/edit_food', function (req, res) {
  console.log("edit post");
  console.log(req.body.name);
})

app.delete('/api/v1/del_food', function (req, res) {
  console.log("del post");
  console.log(req.body.name);
}) 


// DB Creation

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='foodList'",
  function(err, rows) {
    if(err !== null) {
      console.log(err);
    }
    else if(rows === undefined) {
      db.run('CREATE TABLE "foodList" ' +  
             '("name" TEXT, ' + 
             '"key" TEXT)', function(err) {
      if(err != null) {
        console.log(err);
      }
      else {
        console.log("SQL Table foodList initialized.");
      }
    });
    }
    else {
      console.log("SQL Table foodList already initialized.");
    }
});

var server = app.listen(3001, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

function cleanup () {
  shutting_down = true;
  server.close( function () {
    console.log( "Closed out remaining connections.");
    //Close db connections, other chores, etc.
    db.close()
    process.exit();
  });
    
  setTimeout( function () {
    console.error("Could not close connections in time, forcing shut down");
    process.exit(1);
  }, 30*1000);
}
			    
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);


