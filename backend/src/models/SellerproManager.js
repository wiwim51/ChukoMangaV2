const AbstractManager = require('./AbstractManager')

class SellerproManager extends AbstractManager {
  constructor() {
    super({ table: 'seller_pro' })
  }

  insert(sellerPro) {
    return this.database.query(
      `insert into ${this.table} (siret, company_name , user_id) values (?, ?, ?)`,
      [sellerPro.siret, sellerPro.company_name, sellerPro.user_id]
    )
  }

  update(sellerPro) {
    return this.database.query(
      `update ${this.table} set siret = ?, company_name = ?, user_id = ? where id = ?`,
      [sellerPro.siret, sellerPro.company_name, sellerPro.user_id, sellerPro.id]
    )
  }
}

module.exports = SellerproManager
