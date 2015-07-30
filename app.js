var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', 'views/')

app.get('/', express.static(__dirname + '/views'));

app.post('/exec', function (req, res) {
  console.log(req.body);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Asolide app listening at http://%s:%s', host, port);
});
