const AbstractManager = require('./AbstractManager')

class PurchaseManager extends AbstractManager {
  constructor() {
    super({ table: 'purchase' })
  }

  insert(purchase) {
    return this.database.query(
      `insert into ${this.table} (purchase_nb, date, user_id) values (?, ?, ?)`,
      [purchase.order_nb, purchase.date, purchase.user_id]
    )
  }

  update(purchase) {
    return this.database.query(
      `update ${this.table} set purchase_nb = ?, date = ?, user_id = ? where id = ?`,
      [purchase.purchase_nb, purchase.date, purchase.user_id, purchase.id]
    )
  }
}

module.exports = PurchaseManager
