const AbstractManager = require('./AbstractManager')

class UserManager extends AbstractManager {
  constructor() {
    super({ table: 'user' })
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (pseudo, lastname, firstname, pwd, pwd_forget, email, avatar, rating) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.pseudo,
        user.lastname,
        user.firstname,
        user.pwd,
        user.pwd_forget,
        user.email,
        user.avatar,
        user.rating,
      ]
    )
  }

  async addOne(user) {
    try {
      const [result] = await this.database.query(
        `insert into ${this.table} (pwd, email) values (?, ?)`,
        [user.password, user.email]
      )
      return { id: result.insertId, email: user.email }
    } catch (erreur) {
      console.error(erreur)
      throw new Error("Erreur lors de l'insertion de l'utilisateur")
    }
  }

  async findByEmail(email) {
    try {
      const [user] = await this.database.query(
        `select * from ${this.table} where email = ?`,
        [email]
      )
      return user
    } catch (error) {
      console.error(error)
    }
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set pseudo = ?, lastname= ?, firstname= ?, avatar= ?, rating= ? where id = ?`,
      [
        user.pseudo,
        user.lastname,
        user.firstname,
        user.avatar,
        user.rating,
        user.id,
      ]
    )
  }

  changePassword(user) {
    return this.database.query(
      `update ${this.table} set pwd = ? where id = ?`,
      [user.pwd, user.id]
    )
  }

  changeEmail(user) {
    return this.database.query(
      `update ${this.table} set email = ? where id = ?`,
      [user.email, user.id]
    )
  }
}

module.exports = UserManager
