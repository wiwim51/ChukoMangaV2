const AbstractManager = require('./AbstractManager')

class AdressManager extends AbstractManager {
  constructor() {
    super({ table: 'adress' })
  }

  insert(adress) {
    return this.database.query(
      `insert into ${this.table} (adress,user_id) values (?, ?)`,
      [adress.adress, adress.user_id]
    )
  }

  update(adress) {
    return this.database.query(
      `update ${this.table} set adress = ?, user_id = ? where id = ?`,
      [adress.adress, adress.user_id, adress.id]
    )
  }
}

module.exports = AdressManager
