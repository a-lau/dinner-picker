var express = require('express');
var app = express();

// This responds a GET request for /list_food.
app.get('/api/v1/list_food', function (req, res) {
  res.send({list: 'Food List'});
})

app.post('/api/v1/add_food', function (req, res) {
  res.send({add: 'Add food'});
})

app.delete('/api/v1/del_food', function (req, res) {
  res.send({del: 'Del Food'});
}) 

var server = app.listen(3001, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
