const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Rutas
const {prodRouter} = require('./routes/productsRoutes')
const {msgRouter} = require('./routes/messagesRoutes')


app.use('/api/productos', prodRouter);
app.use('/api/mensajes', msgRouter);



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})