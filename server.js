var express = require('express');
var dateService = require('./src/dateService');

var port = +process.env.PORT || 8080;
var app = express();

app.get('*', function(req, res) {
  var query = decodeURI(req.originalUrl.slice(1));
  var date = dateService.getJSON(query);
  res.json(date);
});

app.listen(port);
