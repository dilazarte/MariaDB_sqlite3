const express = require('express');
const {Router} = express;
const msgRouter = Router();

const {getAll, getById, insertMessage} = require('../models/chat');

msgRouter.get('/:id?', (req, res)=>{
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

msgRouter.post('/', (req, res)=>{
    const newMsg = req.body;
    insertMessage(newMsg)
    .then( response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(400).json(error)
    })
})




module.exports = {msgRouter}