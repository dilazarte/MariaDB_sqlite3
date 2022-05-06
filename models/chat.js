const { knexSqLite3 } = require('../options/sqLite3')

const getAll = () => knexSqLite3('mensajes').select('*')

const getById = (idProd) => knexSqLite3('mensajes').select('*').where({id: idProd})

const insertMessage = (obj) => knexSqLite3('mensajes').insert(obj)


module.exports = {getAll, getById, insertMessage}