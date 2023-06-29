const Joi = require('joi')

const loginValidator = (user) => {
  const result = Joi.object({
    password: Joi.string().min(8).max(30).presence('required'),
    email: Joi.string().email().presence('required'),
  })
    .required()
    .validate(user, { abortEarly: false }).error

  if (result) {
    const errorsMessages = result.details.map((error) => ({
      message: error.message,
    }))
    return { errorCount: result.details.length, errorsMessages }
  }
  return false
}

module.exports = loginValidator
