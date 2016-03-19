var path = require('path');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var net = require('net');
var socket = new net.Socket();
socket.connect(9999, '172.16.1.204', function () {
  console.log('connected');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/', function (req, res) {
  res.render('index');
});

app.post('/r', function (req, res) {
  console.log('r');
  socket.write('e');
  res.json({direction: "r"});
});

app.post('/l', function (req, res) {
  console.log('l');
  socket.write('q');
  res.json({direction: "l"});
});

app.post('/stop', function (req, res) {
  console.log('s');
  socket.write('s');
  res.json({direction: "s"});
});

app.listen(3000, function () {
  console.log('server running at 0.0.0:3000');
});
