var express = require('express');
var app = express();

// This responds a GET request for /list_food.
app.get('/api/v1/list_food', function (req, res) {
  console.log("Got a GET request for /api/v1/list_food");
  res.send({list: 'Food List'});
})

var server = app.listen(3001, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
