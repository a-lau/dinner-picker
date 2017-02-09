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

// API Calls for foodList
app.get('/api/v1/list_food', function (req, res) {
  db.all('SELECT * FROM foodlist', function(err, row) {
    res.send(JSON.stringify(row));
  });
})

app.post('/api/v1/add_food', function (req, res) {
	console.log(req)
  checkExists(req.body.key).then(exists => {
  if(!exists) {
    const sqlRequest = "INSERT INTO 'foodList' (name, modDate, weight, key, lastUsed) " + 
  	                   "VALUES('" + req.body.name + "', '" + req.body.date + "', '" + req.body.weight + "', '" + req.body.key + "', NULL)"
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
    res.status(409).send({statusText: 'Duplicate Entry'})
  }
  });
})

app.post('/api/v1/edit_food', function (req, res) {
  checkExists(req.body.key).then(exists => {
  if(!exists || req.body.old == req.body.key) {
    const sqlRequest = "UPDATE foodList SET name='" + req.body.name + "', " +
  	                   "modDate='" + req.body.date + "', " + "weight='" + req.body.weight + "', " + "key='" + req.body.key + "' " +
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
    res.status(409).send({statusText: 'Duplicate Entry'})
  }
  });
})

app.post('/api/v1/update_picked', function (req, res) {
  const sqlRequest = "UPDATE foodList SET modDate='" + req.body.time + "' " +
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

// API calls for eatenList
app.post('/api/v1/add_eaten', function (req, res) {
  const sqlRequest = "INSERT INTO 'eatenList' (name, dateUsed) " +
                     "VALUES('" + req.body.name + "', '" + req.body.date + "')"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      next(err);
    } else {
      db.all('SELECT * FROM eatenList', function(err, row) {
        res.send(JSON.stringify(row));
      });
    }
  });
})

app.get('/api/v1/list_eaten', function (req, res) {
  db.all('SELECT * FROM eatenList', function(err, row) {
    res.send(JSON.stringify(row));
  });
})


// Helper functions
function checkExists(key) {
  return new Promise(function(resolve, reject) {
    const sqlCheck = "SELECT * FROM foodlist WHERE key='" + key + "'";
    db.all(sqlCheck, function(err, row) {
      resolve(row.length === 0 ? false : true );
    })
  })
}

// TODO Make a helper function that takes the params and then runs a check instead of repeating code for both tables

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
	          '"modDate" INTEGER, ' + 
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

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='eatenList'",
  function(err, rows) {
    if(err !== null) {
      console.log(err);
    } else if(rows === undefined) {
      db.run('CREATE TABLE "eatenList" ' +
             '("name" TEXT, ' +
              '"dateUsed" INTEGER, ' +
	          '"key" INTEGER PRIMARY KEY)', function(err) {
    if(err != null) {
      console.log(err);
    } else {
      console.log("SQL Table eatenList initialized.");
    }
  });
  } else {
    console.log("SQL Table eatenList already initialized.");
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


