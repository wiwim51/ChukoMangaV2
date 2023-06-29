const AbstractManager = require('./AbstractManager')

class Product extends AbstractManager {
  constructor() {
    super({ table: 'product', tableImage: 'product_image' })
  }

  findProduct(userId) {
    return this.database.query(
      `SELECT product.*, tome.serie_id, tome.image, tome.number, serie.name, GROUP_CONCAT(genre.name) AS genres, product_image.image AS customImage
      FROM product 
      JOIN tome ON product.tome_id = tome.id 
      JOIN serie ON tome.serie_id = serie.id 
      JOIN serie_genre ON serie.id = serie_genre.serie_id 
      JOIN genre ON serie_genre.genre_id = genre.id 
      JOIN product_image ON product.id = product_image.product_id 
      WHERE product.user_id = ?
      GROUP BY product.id, product.user_id, tome.id, serie.id, product_image.id
      ORDER BY creation_date;`,
      [userId]
    )
  }

  findCatalog() {
    return this.database.query(
      `SELECT product.*, tome.serie_id, tome.image, tome.number, serie.name, GROUP_CONCAT(genre.name) AS genres, product_image.image AS customImage
    FROM product 
    JOIN tome ON product.tome_id = tome.id 
    JOIN serie ON tome.serie_id = serie.id 
    JOIN serie_genre ON serie.id = serie_genre.serie_id 
    JOIN genre ON serie_genre.genre_id = genre.id 
    JOIN product_image ON product.id = product_image.product_id 
    GROUP BY product.id, product.user_id, tome.id, serie.id, product_image.id
    ORDER BY creation_date DESC;`
    )
  }

  findDetailed(id) {
    return this.database.query(
      `SELECT product.*, tome.serie_id, tome.image, tome.number, serie.name, GROUP_CONCAT(genre.name) 
      AS genres, product_image.image AS customImage, user.firstname, user.lastname, user.avatar, user.rating, user.email
      FROM product
      JOIN tome ON product.tome_id = tome.id 
      JOIN serie ON tome.serie_id = serie.id 
      JOIN serie_genre ON serie.id = serie_genre.serie_id 
      JOIN genre ON serie_genre.genre_id = genre.id 
      JOIN product_image ON product.id = product_image.product_id 
      JOIN user ON product.user_id = user.id
      WHERE product.id = ?
      GROUP BY product.id, product.user_id, tome.id, serie.id, product_image.id
      ORDER BY creation_date;`,
      [id]
    )
  }

  findTome(serieId) {
    return this.database.query(
      `SELECT product.id AS product_id, product.*, 
      tome.serie_id, tome.image, tome.number, serie.id, serie.name, GROUP_CONCAT(genre.name) AS genres, product_image.image AS customImage
      FROM product
      JOIN tome ON product.tome_id = tome.id 
      JOIN serie ON tome.serie_id = serie.id 
      JOIN serie_genre ON serie.id = serie_genre.serie_id 
      JOIN genre ON serie_genre.genre_id = genre.id 
      JOIN product_image ON product.id = product_image.product_id 
      WHERE serie.id = ?
      GROUP BY product.id, product.user_id, tome.id, serie.id, product_image.id;
      `,
      [serieId]
    )
  }

  findSameGenre(sameGenre) {
    return this.database.query(
      `SELECT product.id AS product_id, product.*, tome.serie_id, tome.image, tome.number, serie.id, genre.id, genre.name, GROUP_CONCAT(genre.name) 
      AS genres, product_image.image AS customImage 
      FROM product 
      JOIN tome ON product.tome_id = tome.id 
      JOIN serie ON tome.serie_id = serie.id 
      JOIN serie_genre ON serie_genre.serie_id = serie.id 
      JOIN genre ON genre.id = serie_genre.genre_id 
      JOIN product_image ON product.id = product_image.product_id 
      WHERE genre.id = ? 
      GROUP BY product.id, product.user_id, tome.id, serie.id, genre.id, product_image.id;`,
      [sameGenre]
    )
  }

  insert(product) {
    return this.database.query(
      `insert into ${this.table} (tome_id, user_id, etat, price, creation_date) values (?, ?, ?, ?, ?)`,
      [
        product.tome_id,
        product.user_id,
        product.etat,
        product.price,
        product.creation_date,
      ]
    )
  }

  addProduct(product) {
    return this.database.query(
      `insert into ${this.table} (tome_id, user_id, etat, price, creation_date) values (?, ?, ?, ?, NOW())`,
      [
        product.tome_id,
        product.user_id,
        product.etat,
        product.price,
        // product.creation_date,
      ]
    )
  }

  // addProductImage(productImage, result.insertId) {
  //   return this.database.transaction(async (connection) => {
  //     await connection.query(
  //       `insert into ${this.tableImage} (image, product_id) values (?, ?)`,
  //       [productImage.image, result.insertId.product_id]
  //     )
  //   })
  // }

  update(product) {
    return this.database.query(
      `update ${this.table} set tome_id = ?, etat = ?, price = ? where id = ?`,
      [product.tome_id, product.etat, product.price, product.id]
    )
  }
}

module.exports = Product
