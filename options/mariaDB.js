const knexMariaDB = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce_db'
    },
    pool: {min: 0, max: 10}
})

module.exports = {knexMariaDB}