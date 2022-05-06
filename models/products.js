const { knexMariaDB } = require('../options/mariaDB')

//metodos para realizar CRUD en mariaDB.-
//Todas las query a la db en una sola linea con return implicito 
const getAll = () => knexMariaDB('productos').select('*')

const getById = (idProd) => knexMariaDB('productos').select('*').where({id: idProd})

const insertProduct = (obj) => knexMariaDB('productos').insert(obj)

const updateProduct = async (id, obj) => knexMariaDB('productos').where({id: id}).update(obj)

const deleteProductById = (id) => knexMariaDB('productos').where({id: id}).del()

const deleteAllProducts = () => knexMariaDB('productos').del()



module.exports={getAll, insertProduct, getById, updateProduct, deleteAllProducts, deleteProductById}