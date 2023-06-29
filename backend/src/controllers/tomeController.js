const models = require('../models')

const browse = (req, res) => {
  models.tome
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const findVolume = (req, res) => {
  models.tome
    .findVolumeCorrected(req.params.id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const tome = req.body

  // TODO validations (length, format...)

  tome.id = parseInt(req.params.id, 10)

  models.tome
    .update(tome)
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
  const tome = req.body
  // TODO validations (length, format...)

  models.tome
    .insert(tome)
    .then(([result]) => {
      res.status(201).json(`/tome/${result.insertId}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'message error' })
    })
}
const read = (req, res) => {
  models.tome
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
const destroy = (req, res) => {
  models.tome
    .delete(req.params.id)
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
module.exports = { browse, add, edit, read, destroy, findVolume }
