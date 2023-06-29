const AbstractManager = require('./AbstractManager')

class CartManager extends AbstractManager {
  constructor() {
    super({ table: 'cart' })
  }

  insert(cart) {
    return this.database.query(
      `insert into ${this.table} (nb_product, total_price, user_id) values (?, ?, ?)`,
      [cart.nb_product, cart.total_price, cart.user_id]
    )
  }

  update(cart) {
    return this.database.query(
      `update ${this.table} set nb_product = ?, total_price = ?, user_id = ? where id = ?`,
      [cart.nb_product, cart.total_price, cart.user_id, cart.id]
    )
  }
}

module.exports = CartManager
