const AbstractManager = require('./AbstractManager')

class SerieManager extends AbstractManager {
  constructor() {
    super({ table: 'serie' })
  }

  findSerieName() {
    return this.database.query(`select * from  ${this.table}`)
  }

  findVolume(serieName) {
    return this.database.query(
      `select serie.nb_volumes from  ${this.table} WHERE serie.name= ?`,
      [serieName]
    )
  }

  findSerie(searchResult) {
    return this.database.query(
      `SELECT serie.*, SUBSTRING_INDEX(GROUP_CONCAT(genre.name), ',', 1) AS genre_name, COUNT(DISTINCT product.id) AS quantity
      FROM serie
      LEFT JOIN tome ON serie.id = tome.serie_id
      LEFT JOIN product ON product.tome_id = tome.id
      LEFT JOIN serie_genre ON serie.id = serie_genre.serie_id
      LEFT JOIN genre ON serie_genre.genre_id = genre.id
      WHERE serie.name LIKE ?
      GROUP BY serie.id;`,
      [searchResult + '%']
    )
  }

  insert(serie) {
    return this.database.query(
      `insert into ${this.table} (name, image, description, nb_volumes, author , launch) values (?, ?, ?, ?, ?, ?)`,
      [
        serie.name,
        serie.image,
        serie.description,
        serie.nb_volumes,
        serie.author,
        serie.launch,
      ]
    )
  }

  update(serie) {
    return this.database.query(
      `update ${this.table} name = ?, image = ?, description = ?, nb_volumes = ?, author = ?, launch = ? where id = ?`,
      [
        serie.name,
        serie.image,
        serie.description,
        serie.nb_volumes,
        serie.author,
        serie.launch,
        serie.id,
      ]
    )
  }
}

module.exports = SerieManager
