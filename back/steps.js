const { pool } = require('./pool')

const getSteps = (request, response) => {
  const { fk_project } = request.body
  pool.query('SELECT * FROM steps ORDER BY id ASC WHERE fk_project = $1', [fk_project],  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createStep = (request, response) => {
  const { fk_project, fk_parent, name, planned_at } = request.body

  pool.query('INSERT INTO steps (fk_project, fk_parent, name, planned_at) VALUES ($1, $2, $3, COALESCE($4,NOW()))', [fk_project, fk_parent, name, planned_at], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`step added with ID: ${result.insertId}`)
  })
}

const updateStep = (request, response) => {
  const id = parseInt(request.params.id)
  const { fk_parent, name, planned_at, finished_at, state } = request.body

  pool.query(
    'UPDATE steps SET fk_project = COALESCE($2,fk_project), name = COALESCE($3,name), planned_at = COALESCE($4,planned_at), finished_at = COALESCE($5,finished_at), state = COALESCE($6,state) WHERE id = $1',
    [id, fk_parent, name, planned_at, finished_at, state],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`step modified with ID: ${id}`)
    }
  )
}

const deleteStep = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('UPDATE steps SET fk_parent = NULL WHERE fk_parent = $1', [id], (error) => {
    if (error) {
      throw error
    }
  })

  pool.query('DELETE FROM steps WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`step deleted with ID: ${id}`)
  })
}

module.exports = {
  getSteps,
  createStep,
  updateStep,
  deleteStep,
}
