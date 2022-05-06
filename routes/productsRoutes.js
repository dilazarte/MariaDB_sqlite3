const express = require('express');
const {Router} = express;
const prodRouter = Router();
const {getAll, insertProduct, getById, updateProduct, deleteAllProducts, deleteProductById} = require('../models/products')

prodRouter.get('/:id?', (req, res)=>{
    const id =  req.params.id 
    if(id){
        getById(id)
        .then( response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(400).json(error)
        })
    }else{
        getAll()
        .then( response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(400).json(error)
        })
    }
})

prodRouter.post('/', (req, res)=>{
    const newProd = req.body;
    insertProduct(newProd)
    .then( response => {
        res.status(200).json(`Producto agregado con id ${response}`)
    })
    .catch(error => {
        res.status(400).json(error)
    })
})

prodRouter.put('/:id', (req, res)=>{
    const id = req.params.id
    const dataToUpdate = req.body
    updateProduct(id, dataToUpdate)
    .then( response => {
        if(response == 1){
            res.status(200).json(`Producto con id ${id} actualizado correctamente!`)
        }else{
            res.status(400).json(`No se encontro el producto con id ${id}`)
        }
    })
    .catch(error => {
        res.status(400).json(error)
    })
})

prodRouter.delete('/:id', (req, res)=>{
    const id = req.params.id
    deleteProductById(id)
    .then( response => {
        if(response == 1){
            res.status(200).json(`Producto con id ${id} borrado correctamente!`)
        }else{
            res.status(400).json(`No se encontro el producto con id ${id}`)
        }
    })
    .catch(error => {
        res.status(400).json(error)
    })
})




module.exports = {prodRouter}