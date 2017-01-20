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

// API Calls
app.get('/api/v1/list_food', function (req, res) {
  db.all('SELECT * FROM foodlist', function(err, row) {
    res.send(JSON.stringify(row));
  });
})

app.post('/api/v1/add_food', function (req, res) {
  checkExists(req.body.key).then(exists => {
  if(!exists) {
    const sqlRequest = "INSERT INTO 'foodList' (name, lastUsed, weight, key) " + 
	               "VALUES('" + req.body.name + "', '" + req.body.date + "', '" + req.body.weight + "', '" + req.body.key + "')"
    db.run(sqlRequest, function(err) {
      if(err !== null) {
        next(err);
     } else {
       db.all('SELECT * FROM foodlist', function(err, row) {
         res.send(JSON.stringify(row));
       });
     }
   }); 
  } else {
    res.send({ error: "duplicate entry" })
  }
  });
})

app.post('/api/v1/edit_food', function (req, res) {
  checkExists(req.body.key).then(exists => {
  if(!exists || req.body.old == req.body.key) {
    const sqlRequest = "UPDATE foodList SET name='" + req.body.name + "', " +
  	               "lastUsed='" + req.body.date + "', " + "weight='" + req.body.weight + "', " + "key='" + req.body.key + "' " +
                       "WHERE name='" + req.body.old + "'"
    db.run(sqlRequest, function(err) {
      if(err !== null) {
        next(err);
      } else {
        db.all('SELECT * FROM foodlist', function(err, row) {
          res.send(JSON.stringify(row));
        });
      }
    });
  } else {
    res.send({error: "Duplicate entry" })
  }
  });
})

app.post('/api/v1/update_picked', function (req, res) {
  const sqlRequest = "UPDATE foodList SET lastUsed='" + req.body.time + "' " +
                     "WHERE key='" + req.body.key + "'"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      next(err);
    } else {
      db.all('SELECT * FROM foodlist', function(err, row) {
        res.send(JSON.stringify(row));
      });
    }
  });
})

app.delete('/api/v1/del_food', function (req, res) {
  db.run("DELETE FROM foodList WHERE key='" + req.body.key + "'",
         function(err) {
    if(err !== null) {
      next(err);
    } else {
      db.all('SELECT * FROM foodlist', function(err, row) {
        res.send(JSON.stringify(row));
      });
    }
  });
}) 

function checkExists(key) {
  return new Promise(function(resolve, reject) {
    const sqlCheck = "SELECT * FROM foodlist WHERE key='" + key + "'";
    db.all(sqlCheck, function(err, row) {
      resolve(row.length === 0 ? false : true );
    })
  })
}

  


// DB Creation

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='foodList'",
  function(err, rows) {
    if(err !== null) {
      console.log(err);
    }
    else if(rows === undefined) {
      db.run('CREATE TABLE "foodList" ' +  
             '("name" TEXT, ' + 
	     '"lastUsed" INTEGER, ' +
	     '"weight" INTEGER, ' +
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


