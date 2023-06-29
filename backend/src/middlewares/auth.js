const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
}

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions)
}

const verifyPassword = (plainPassword, hashPassword) => {
  return argon2.verify(plainPassword, hashPassword, hashingOptions)
}
const encodeJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const decodeJWT = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET)
}

const authorization = async (req, res, next) => {
  try {
    const token = req.cookies.NomFarfelu
    if (!token) {
      throw new Error()
    }
    const data = decodeJWT(token)
    req.userId = data.id
    req.userEmail = data.email
    return next()
  } catch (error) {
    console.error(error)
    res.sendStatus(401)
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  encodeJWT,
  decodeJWT,
  authorization,
}
