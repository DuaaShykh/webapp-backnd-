
// const express = require('express');
// const app = express();

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3001;
const server = http.createServer(app);


server.listen(port)
console.log("App is listening on port " + port)
