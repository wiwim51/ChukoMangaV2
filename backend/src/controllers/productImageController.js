const models = require('../models')

const browse = (req, res) => {
  models.product_image
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
  const productImageController = req.body

  // TODO validations (length, format...)

  productImageController.id = parseInt(req.params.id, 10)

  models.product_image
    .update(productImageController)
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
  const productImageController = req.body
  // TODO validations (length, format...)

  models.productImageController
    .insert(productImageController)
    .then(([result]) => {
      res.status(201).json(`/productImageController/${result.insertId}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'message error' })
    })
}

const read = (req, res) => {
  models.productImageController
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

const destroyByProductId = async (productId) => {
  try {
    await models.product_image.deleteByProductId(productId)
  } catch (err) {
    console.error(err)
    throw new Error('Error deleting related product images')
  }
}

module.exports = { browse, add, edit, read, destroyByProductId }
