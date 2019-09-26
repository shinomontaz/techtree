const cfg = require('./config.json');

const express = require('express')
const app = express()
app.get('/', (request, response) => {
    response.send('Hello from Express!')
})
app.listen(cfg.serverPort, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${cfg.serverPort}`)
})
