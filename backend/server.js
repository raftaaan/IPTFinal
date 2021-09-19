const http = require('http')
const app = require('./app')
const db = require('./API/models/db_connection')

const server = http.createServer(app);
const port = 8000;



//code for creating own Server

server.listen(port, ()=> {
    console.log(`Listening to port:${port}`)
})