const {knexMariaDB} = require('./options/mariaDB')

const createTable = async () => {
    await knexMariaDB.schema.createTable('productos', table=>{
        table.increments('id').primary();
        table.string('nombre', 255).notNull();
        table.string('descripcion', 255).notNull();
        table.string('foto', 255).notNull()
        table.decimal('precio', 8, 2).notNull()
        table.integer('stock').notNull()
    })
    .then(()=> console.log('table created'))
    .catch((err)=> console.log(err))
}

createTable();