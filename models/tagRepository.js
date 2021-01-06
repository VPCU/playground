const db = require('../db_connection')

tagRepository = {}

tagRepository.getAll = async () => {
    return db.query('SELECT * from tags')
}

tagRepository.addTag = async (tag) => {
    return db.query('INSERT INTO tags (name) VALUES (?);', tag.name)
}

module.exports = tagRepository