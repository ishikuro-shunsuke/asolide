var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var spawn = require('child_process').spawn;
var compile = {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));

app.post('/exec', function (req, res) {
  if (compile.kill) {
    console.log('Recompiling...')
    compile.kill('SIGINT');
  } else {
    console.log('Compiling...')
  }

  var header = '#include "../resources/DE2_115.nsh"\n';
  var source = header + req.body.source;
  fs.writeFile('workspace/DE2_115.nsl', source, function (err) {
    if (err) {
      console.log(err);
    }

    compile = spawn('bash', ['./resources/ide.sh']);
    compile.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    compile.stderr.on('data', function (data) {
      console.log(data.toString());
    });
    compile.on('close', function() {
      console.log('Finished.');
      res.send('finished');
    });
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Asolide app listening at http://%s:%s', host, port);
});
