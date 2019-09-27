const cfg = require('./config.json');

const express = require('express')
const db = require('./queries')

const app = express()
app.get('/', (request, response) => {
    response.json({info: 'Hello from Express!'})
})
app.get('/projects', db.getProjects)
app.get('/projects/:id', db.getProjectById)
app.post('/projects', db.createProject)
app.put('/projects/:id', db.updateProject)
app.delete('/projects/:id', db.deleteProject)

app.listen(cfg.serverPort, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${cfg.serverPort}`)
})
