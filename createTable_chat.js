const {knexSqLite3} = require('./options/sqLite3')

const createTable = async () => {
    await knexSqLite3.schema.createTable('mensajes', table=>{
        table.increments('id').primary();
        table.string('mail', 255);
        table.string('texto', 255);
        table.timestamp('hora').defaultTo(knexSqLite3.fn.now());
    })
}

createTable();