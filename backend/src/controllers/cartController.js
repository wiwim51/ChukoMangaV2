const models = require('../models')

const browse = (req, res) => {
  models.cart
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
  const cart = req.body

  // TODO validations (length, format...)

  cart.id = parseInt(req.params.id, 10)

  models.cart
    .update(cart)
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
  const cart = req.body
  // TODO validations (length, format...)

  models.cart
    .insert(cart)
    .then(([result]) => {
      res.status(201).json(`/cart/${result.insertId}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'message error' })
    })
}
const read = (req, res) => {
  models.cart
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
  models.cart
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
module.exports = { browse, add, edit, read, destroy }
