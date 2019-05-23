const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const queryParser = require('express-query-int')
const allowCors = require('./cors')

const produtosMock = require('../api/produtos/produtosMock')

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function(){
    produtosMock.checkDataBase();
    console.log(`BACKEND is running on port ${port}.`);
})

module.exports = server