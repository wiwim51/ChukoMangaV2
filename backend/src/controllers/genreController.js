const models = require('../models')

const browse = (req, res) => {
  models.genre
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const genre = req.body

  // TODO validations (length, format...)

  genre.id = parseInt(req.params.id, 10)

  models.genre
    .update(genre)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const add = (req, res) => {
  const genre = req.body
  // TODO validations (length, format...)

  models.genre
    .insert(genre)
    .then(([result]) => {
      res.status(201).json(`/genre/${result.insertId}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'message error' })
    })
}
const read = (req, res) => {
  models.genre
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows[0])
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
module.exports = { browse, add, edit, read }
