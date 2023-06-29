const models = require('../models')

const browse = (req, res) => {
  models.product
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const catalog = (req, res) => {
  models.product
    .findCatalog()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const productByUser = (req, res) => {
  const userId = parseInt(req.params.userid, 10)
  models.product
    .findProduct(userId)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const detailedproduct = (req, res) => {
  models.product
    .findDetailed(req.params.id)
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

const volumeBySerie = (req, res) => {
  const serieId = parseInt(req.params.serieId, 10)
  models.product
    .findTome(serieId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const volumeByGenre = (req, res) => {
  const sameGenre = parseInt(req.params.sameGenre, 10)
  models.product
    .findSameGenre(sameGenre)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const product = req.body

  // TODO validations (length, format...)

  product.id = parseInt(req.params.id, 10)

  models.product
    .update(product)
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
  const product = req.body
  // TODO validations (length, format...)
  models.product
    .insert(product)
    .then(([result]) => {
      res.status(201).json(`/product/${result.insertId}`)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'message error' })
    })
}

const ProductInsert = (req, res) => {
  const product = req.body
  const data = {
    tome_id: product.serie_volume,
    etat: product.product_etat,
    user_id: product.userId,
    price: product.product_prix,
    // creation_date: new Date(),
  }
  console.info(product)
  console.info('je suis làà', data.user_id)
  models.product
    .addProduct(data)
    .then(([result]) => {
      // models.productImage.insert()
      res.status(201).json({ productId: result.insertId })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'message error' })
    })
}

const read = (req, res) => {
  models.product
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
  models.product
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
  catalog,
  detailedproduct,
  ProductInsert,
  volumeBySerie,
  volumeByGenre,
  productByUser,
}
