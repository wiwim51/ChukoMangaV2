const models = require('../models')
const validateUser = require('../validators/userValidator')
const validateLogin = require('../validators/loginValidator')
const {
  hashPassword,
  verifyPassword,
  encodeJWT,
} = require('../middlewares/auth')

const browse = (req, res) => {
  models.user
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
  const user = req.body

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10)

  models.user
    .update(user)
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
const changedPassword = (req, res) => {
  const user = req.body

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10)

  models.user
    .changePassword(user)
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
const changedEmail = (req, res) => {
  const user = req.body

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10)

  models.user
    .changeEmail(user)
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

const registerUser = async (req, res) => {
  try {
    const errors = validateUser(req.body)
    if (errors) {
      return res.status(401).send(errors)
    }
    const hashedPassword = await hashPassword(req.body.password)
    const result = await models.user.addOne({
      ...req.body,
      password: hashedPassword,
    })
    res.status(201).send(result)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

const login = async (req, res) => {
  try {
    const error = validateLogin(req.body)
    if (error) {
      return res.status(401).send(error)
    }
    const [user] = await models.user.findByEmail(req.body.email)
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }
    const passwordMatch = await verifyPassword(user.pwd, req.body.password)
    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }
    delete user.pwd
    delete user.pwd_forget

    const token = encodeJWT(user)
    res.cookie('NomFarfelu', token, {
      httpOnly: true,
      secure: false,
    })
    res.status(201).json({ user: user.email, userId: user.id })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
const logout = (req, res) => {
  res.clearCookie('NomFarfelu').sendStatus(200)
}

const read = (req, res) => {
  models.user
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
  models.user
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
  registerUser,
  edit,
  read,
  destroy,
  login,
  logout,
  changedEmail,
  changedPassword,
}
