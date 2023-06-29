const AbstractManager = require('./AbstractManager')

class TomeManager extends AbstractManager {
  constructor() {
    super({ table: 'tome' })
  }

  findVolumeCorrected(poulet) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE serie_id=?`, [
      poulet,
    ])
  }

  insert(tome) {
    return this.database.query(
      `insert into ${this.table} (serie_id, image, number, tome_release) values (?, ?, ?, ?)`,
      [tome.serie_id, tome.image, tome.number, tome.tome_release]
    )
  }

  update(tome) {
    return this.database.query(
      `update ${this.table} set serie_id = ?, image = ?, number = ?, tome_release = ? where id = ?`,
      [tome.serie_id, tome.image, tome.number, tome.tome_release, tome.id]
    )
  }
}

module.exports = TomeManager
