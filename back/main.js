require('dotenv').config()

const express = require('express')
const projects = require('./projects')
const steps = require('./steps')

const app = express()
app.use(express.json());

app.get('/', (request, response) => {
    response.json({info: 'Hello from Express!'})
})
app.get('/projects', projects.getProjects)
app.get('/projects/:id', projects.getProjectById)
app.post('/projects', projects.createProject)
app.put('/projects/:id', projects.updateProject)
app.delete('/projects/:id', projects.deleteProject)

app.get('/steps', steps.getSteps)
app.post('/steps', steps.createStep)
app.put('/steps/:id', steps.updateStep)
app.delete('/steps/:id', steps.deleteStep)

app.listen(process.env.serverPort, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${process.env.serverPort}`)
})
