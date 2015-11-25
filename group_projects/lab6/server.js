var express = require('express');
var app = express();
var server = app.listen(8000, function() {
  console.log("Running on 8000");
});

app.get('/', function(req,res){
  res.send('Hello world');
});
app.use('/', express.static('./html', {maxAge: 60*60*1000}));
