const AbstractManager = require('./AbstractManager')

class ProductImage extends AbstractManager {
  constructor() {
    super({ table: 'product_image' })
  }

  insert(productImage) {
    return this.database.query(
      `insert into ${this.table} (image, product_id) values (?, ?)`,
      [productImage.image, productImage.product_id]
    )
  }

  update(newImageLink, condition) {
    const [key, value] = Object.entries(condition)[0]
    return this.database.query(
      `UPDATE ${this.table} SET image = ? WHERE ${key} = ?`,
      [newImageLink, value]
    )
  }

  deleteByProductId(productId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE product_id = ?`,
      [productId]
    )
  }

  findOne(condition) {
    const [key, value] = Object.entries(condition)[0]
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE ${key} = ? LIMIT 1`,
      [value]
    )
  }
}

module.exports = ProductImage
