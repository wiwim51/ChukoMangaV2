const express = require('express')
const app = express()

// stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.use(express.json())
const fs = require('fs')

const multer = require('multer')

const { v4: uuidv4 } = require('uuid')

const upload = multer({ dest: './public/uploads' })

const router = express.Router()
const models = require('./models')

// const characterController = require('./exempleController/characterController')
// const houseController = require('./exempleController/houseController')
// const itemControllers = require('./exempleController/itemControllers')
const addressController = require('./controllers/adressController')
const cartController = require('./controllers/cartController')
const genreController = require('./controllers/genreController')
const productController = require('./controllers/productController')
const productImageController = require('./controllers/productImageController')
const purchaseController = require('./controllers/purchaseController')
const requestController = require('./controllers/requestController')
const sellerproController = require('./controllers/sellerproController')
const serieController = require('./controllers/serieController')
const tomeController = require('./controllers/tomeController')
const userController = require('./controllers/userController')

// route disponible de basse garder les a titre d'exemple
// si on va plus loin  dans la reflextion on peut voir que le fichier itemController.js
// nous fourni des methode que lont peut utiliser " browse, read, edit, add, destroy"
// const { authorization } = require('./middlewares/auth')
router.post('/login', userController.login)

// router.use(authorization)

// stripe route
router.post('/stripe/payment', async (req, res) => {
  const { amount, id } = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
      description: 'My Test Payment',
      payment_method: id,
      confirm: true,
    })
    res.json({
      message: 'Payement réussi',
      success: true,
    })
    return payment
  } catch (error) {
    console.error(error)
    res.json({
      message: 'Le payement à échoué',
      success: false,
    })
  }
})

// routes Public

router.get('/cart', cartController.browse)
router.get('/cart/:id', cartController.read)

router.get('/genre', genreController.browse)
router.get('/genre/:id', genreController.read)

router.get('/product', productController.browse)
router.get('/detailproduit/:id', productController.detailedproduct)

router.get('/product_image', productImageController.browse)
router.get('/product_image/:id', productImageController.read)
router.get('/purchase', purchaseController.browse)
router.get('/purchase/:id', purchaseController.read)
router.get('/serie', serieController.browse)
router.get('/serie/:searchResult', serieController.detailedserie)
router.get('/serie/:id', serieController.read)
router.get('/tome', tomeController.browse)
router.get('/tome/:id', tomeController.read)

router.post('/register-user', userController.registerUser)
router.get('/catalog', productController.catalog)

// Authorization

router.get('/logout', userController.logout)

// routes Private
router.get('/adress', addressController.browse)
router.get('/adress/:id', addressController.read)
router.put('/adress/:id', addressController.edit)
router.post('/adress', addressController.add)

router.put('/cart/:id', cartController.edit)
router.post('/cart', cartController.add)
router.delete('/cart/:id', cartController.destroy)

router.put('/genre/:id', genreController.edit)
router.post('/genre', genreController.add)

router.get('/detailproduit/:id', productController.detailedproduct)
router.get('/tomeStock/:serieId', productController.volumeBySerie)
router.get('/tomeGenre/:sameGenre', productController.volumeByGenre)
router.get('/product/:id', productController.read)
router.put('/product/:id', productController.edit)
router.get('/productUser/:userid', productController.productByUser)
// router.post('/product', productController.add)
router.post('/product', productController.ProductInsert)
router.delete('/product/:id', async (req, res) => {
  const productId = req.params.id

  try {
    await productImageController.destroyByProductId(productId)

    await productController.destroy(req, res)
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).send('Error deleting product')
  }
})

// router.put('/product_image/:id', productImageController.edit)
// router.post('/product_image', productImageController.add)
router.post(
  '/product_image/image/:id',
  upload.single('product_image'),
  (req, res) => {
    console.info('console info req params', req.params)
    const { originalname } = req.file
    const { filename } = req.file
    console.info('originalname', originalname, 'filename', filename)
    const newFilename = `${uuidv4()}-${originalname}`
    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${newFilename}`,
      async (err) => {
        if (err) throw err

        const productImage = {
          product_id: req.params.id,
          image: `http://localhost:4242/uploads/${newFilename}`,
        }

        try {
          await models.product_image.insert(productImage)
          res.send('File uploaded and data saved')
        } catch (error) {
          console.error('Error saving product image:', error)
          res.status(500).send('Failed to save product image')
        }
      }
    )
  }
)
router.put(
  '/product_image/image/:id',
  upload.single('product_image'),
  async (req, res) => {
    console.info('console info req params', req.params)

    if (!req.file) {
      return res.status(400).send('No file was uploaded')
    }

    const { originalname } = req.file
    const { filename } = req.file
    console.info('originalname', originalname, 'filename', filename)
    const newFilename = `${uuidv4()}-${originalname}`

    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${newFilename}`,
      async (err) => {
        if (err) throw err

        const newImageLink = `http://localhost:4242/uploads/${newFilename}`
        console.info('New image link:', newImageLink)

        try {
          const existingImage = await models.product_image.findOne({
            product_id: req.params.id,
          })

          console.info('Existing image:', existingImage)
          if (existingImage) {
            const updateResult = await models.product_image.update(
              newImageLink,
              { product_id: req.params.id }
            )
            console.info('Update result:', updateResult)
          } else {
            const createResult = await models.product_image.insert({
              product_id: req.params.id,
              image: newImageLink,
            })

            console.info('Create result:', createResult)
          }

          res.send('File uploaded and data updated')
        } catch (error) {
          console.error('Error updating product image:', error)
          res.status(500).send('Failed to update product image')
        }
      }
    )
  }
)

router.post('/purchase', purchaseController.add)
router.delete('/purchase/:id', purchaseController.destroy)

router.get('/request', requestController.browse)
router.get('/request/:id', requestController.read)
router.put('/request/:id', requestController.edit)
router.post('/request', requestController.add)
router.delete('/request/:id', requestController.destroy)

router.get('/sellerpro', sellerproController.browse)
router.get('/sellerpro/:id', sellerproController.read)
router.put('/sellerpro/:id', sellerproController.edit)
router.post('/sellerpro', sellerproController.add)
router.delete('/sellerpro/:id', sellerproController.destroy)

router.get('/serie', serieController.browse)
router.get('/serie/:searchResult', serieController.detailedserie)
router.get('/serie/:serieName', serieController.volumeSerie)
router.get('/serie/:id', serieController.read)
router.put('/serie/:id', serieController.edit)
router.post('/serie', serieController.add)
router.delete('/serie/:id', serieController.destroy)

router.get('/formtome/:id', tomeController.findVolume)
router.get('/tome/:id', tomeController.read)
router.put('/tome/:id', tomeController.edit)
router.post('/tome', tomeController.add)
router.delete('/tome/:id', tomeController.destroy)

router.get('/user', userController.browse)
router.get('/user/:id', userController.read)
router.put('/user/:id', userController.edit)
router.delete('/user/:id', userController.destroy)
router.put('/modify-email', userController.changedEmail)
router.put('/modify-password', userController.changedPassword)

module.exports = router
