const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('foodlist.db');

// Setting up parsing of post data
const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// API Calls for foodlist
app.get('/api/v1/list_food', function (req, res) {
  db.all('SELECT * FROM foodlist', function(err, row) {
    res.send(JSON.stringify(row));
  });
})

app.post('/api/v1/add_food', function (req, res) {
  checkExists(req.body.key).then(exists => {
  if(!exists) {
    const sqlRequest = "INSERT INTO 'foodlist' (name, moddate, weight, key, lastused) " + 
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
    const sqlRequest = "UPDATE foodlist SET name='" + req.body.name + "', " +
                       "moddate='" + req.body.date + "', " + "weight='" + req.body.weight + "', " + "key='" + req.body.key + "' " +
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
  const sqlRequest = "UPDATE foodlist SET moddate='" + req.body.time + "' " +
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
  db.run("DELETE FROM foodlist WHERE key='" + req.body.key + "'",
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
  const sqlRequest = "INSERT INTO 'eatenlist' (name, dateused) " +
                     "VALUES('" + req.body.name + "', '" + req.body.date + "')"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      next(err);
    } else {
      db.all('SELECT * FROM eatenlist', function(err, row) {
        res.send(JSON.stringify(row));
      });
    }
  });
})

app.get('/api/v1/list_eaten', function (req, res) {
  db.all('SELECT * FROM eatenlist', function(err, row) {
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
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='foodlist'",
  function(err, rows) {
    if(err !== null) {
      console.log(err);
    }
    else if(rows === undefined) {
      db.run('CREATE TABLE "foodlist" ' +  
             '("name" TEXT, ' + 
              '"lastused" INTEGER, ' +
              '"moddate" INTEGER, ' + 
              '"weight" INTEGER, ' +
              '"key" TEXT)', function(err) {
      if(err != null) {
        console.log(err);
      }
      else {
        console.log("SQL Table foodlist initialized.");
      }
    });
    }
    else {
      console.log("SQL Table foodlist already initialized.");
    }
});

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='eatenlist'",
  function(err, rows) {
    if(err !== null) {
      console.log(err);
    } else if(rows === undefined) {
      db.run('CREATE TABLE "eatenlist" ' +
             '("name" TEXT, ' +
              '"dateused" INTEGER, ' +
              '"key" INTEGER PRIMARY KEY)', function(err) {
    if(err != null) {
      console.log(err);
    } else {
      console.log("SQL Table eatenlist initialized.");
    }
  });
  } else {
    console.log("SQL Table eatenlist already initialized.");
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


