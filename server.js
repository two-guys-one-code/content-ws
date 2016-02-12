var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var address = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

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
