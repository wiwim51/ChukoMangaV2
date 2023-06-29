const AbstractManager = require('./AbstractManager')

class RequestManager extends AbstractManager {
  constructor() {
    super({ table: 'request' })
  }

  insert(request) {
    return this.database.query(
      `insert into ${this.table} (condition, price) values (?, ?)`,
      [request.condition, request.price]
    )
  }

  update(request) {
    return this.database.query(
      `update ${this.table} condition = ?, price = ? where id = ?`,
      [request.condition, request.price, request.id]
    )
  }
}

module.exports = RequestManager
