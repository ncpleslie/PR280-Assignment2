var http = require('http')
let controller = require('../controller/controller')

const server = http.createServer(controller)

server.listen(8080)