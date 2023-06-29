const AbstractManager = require('../models/AbstractManager')

class HouseManager extends AbstractManager {
  constructor() {
    super({ table: 'houses' })
  }

  insert(house) {
    return this.database.query(
      `insert into ${this.table} (houseName) values (?)`,
      [house.houseName]
    )
  }
}
module.exports = HouseManager
