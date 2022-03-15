const path = require('path');
const express = require('express');
const routes = require('./routes/routes');


const http = require('http');

require('dotenv').config({path: __dirname + '/.env'});

const serveStatic = require('serve-static');
var cors = require('cors')

const app = express();

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(serveStatic(__dirname + "/public"));


routes(app);



// ? ========================= Developemnt ===================================== 
// ? ==========================================================================

const PORT = process.env.PORT || 3000;

app.set('port', PORT)

const server = http
  .createServer(app)
  .listen(app.get('port'), function () {
    console.log('Express HTTP server listening on port ' + app.get('port'));
  });
