const models = require('../models')

const browse = (req, res) => {
  models.serie
    .findSerieName()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const volumeSerie = (req, res) => {
  models.serie
    .findVolume(req.params.searchResult)
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

const detailedserie = (req, res) => {
  models.serie
    .findSerie(req.params.searchResult)
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

const edit = (req, res) => {
  const serie = req.body

  // TODO validations (length, format...)

  serie.id = parseInt(req.params.id, 10)

  models.serie
    .update(serie)
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
  const serie = req.body
  // TODO validations (length, format...)

  models.serie
    .insert(serie)
    .then(([result]) => {
      res.status(201).json(`/serie/${result.insertId}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'message error' })
    })
}
const read = (req, res) => {
  models.serie
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
  models.serie
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
module.exports = {
  browse,
  add,
  edit,
  read,
  destroy,
  detailedserie,
  volumeSerie,
}
