//required node modules
const http = require('http')

//filr imports
const respond = require('./lib/respond.js');

//connection settings
const port = process.env.port || 3000;

//create server
const server = http.createServer(respond);

server.listen(port,() => {
    console.log(`listening to port: ${port}`)
});