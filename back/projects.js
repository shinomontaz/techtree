const { pool } = require('./pool')

const getProjects = (request, response) => {

  pool.query('SELECT * FROM projects ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProjectById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM projects  WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProject = (request, response) => {
  const { name } = request.body

  pool.query('INSERT INTO projects (name) VALUES ($1)', [name], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`project added with ID: ${result.insertId}`)
  })
}

const updateProject = (request, response) => {
  const id = parseInt(request.params.id)
  const { name } = request.body
  pool.query(
    'UPDATE projects SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`project modified with ID: ${id}`)
    }
  )
}

const deleteProject = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM projects WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`project deleted with ID: ${id}`)
  })
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}
