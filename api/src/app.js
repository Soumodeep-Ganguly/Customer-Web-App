const express       = require('express');
var bodyParser      = require('body-parser');
var cors            = require('cors');
var dotenv          = require('dotenv');
var MongoClient     = require('mongoose');

const app = express();
app.use(cors());

// Enable environment variable
dotenv.config();

// Connection to MongoDB server
MongoClient.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology: true},function(){
    console.log('Connect to MongoDB');
});
MongoClient.set('useFindAndModify', false);
MongoClient.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/',express.static('public'));

require('./router/app.js')(app);
module.exports = app;