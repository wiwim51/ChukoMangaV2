const AbstractManager = require('./AbstractManager')

class GenreManager extends AbstractManager {
  constructor() {
    super({ table: 'genre' })
  }

  insert(genre) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      genre.name,
    ])
  }

  update(genre) {
    return this.database.query(
      `update ${this.table} set genre = ? where id = ?`,
      [genre.name, genre.id]
    )
  }
}

module.exports = GenreManager
