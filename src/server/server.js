var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('foodList.db');

// This responds a GET request for /list_food.
app.get('/api/v1/list_food', function (req, res) {
  res.send({list: 'Food List'});
})

app.post('/api/v1/add_food', function (req, res) {
  res.send({add: 'Add food'});
})

app.post('/api/v1/edit_food', function (req, res) {
  res.send({edit: 'Edit food'});
})

app.delete('/api/v1/del_food', function (req, res) {
  res.send({del: 'Del Food'});
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

db.close();

var server = app.listen(3001, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
