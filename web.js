var express = require('express');
var pg = require('pg');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {

//  response.send("DB: [" + process.env.DATABASE_URL + "]");
var client = new pg.Client(process.env.DATABASE_URL);
client.connect();

console.log(process.env.DATABASE_URL);

//  pg.connect(process.env.DATABASE_URL, function(err, client) {
    var query = client.query('SELECT * FROM users');
    var html = '';

    query.on('row', function(row) {
      console.log(row.username);
      html += row.username + ',';
    });

    query.on('end', function() { 
      client.end();
      response.send('ROWS: [' + html + ']');
    });

    //response.send('ROWS: [' + html + ']');
//  });

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
