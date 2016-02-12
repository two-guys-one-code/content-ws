var cc = require('config-multipaas')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = config.get('PORT');
var address = config.get('IP');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up models
app.set('models', require('./models'));

app.use(express.static(__dirname + '/public'));

//middleware
var middleware = require('./validateRequest')(app);
app.all('/api/*', middleware);

//routes
var router = require('./routes')(app);
app.use('/', router);

app.listen(port, address);

console.log('running at port: ' + port);
exports = module.exports = app;
