var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up models
app.set('models', require('./models'));

//routes
var router = require('./routes')(app);
app.use('/api', router);

app.listen(port);

console.log('running at port: ' + port);
exports = module.exports = app;
