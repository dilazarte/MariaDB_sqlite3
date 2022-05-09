const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const handlebars = require('express-handlebars');
const moment = require('moment')

// Usando el las clases
// const { getProductos, saveNewProd } = require('./helpers/funciones');
// const { getMensajes, saveMensaje } = require('./helpers/chat/funciones');

// Usando bases de datos.-
const prodModel = require('./models/products');
const chatModel = require('./models/chat');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.engine(
    'hbs',
    handlebars.engine({
        extname:'.hbs',
        defaultLayout:'./index.hbs',
        layoutsDir: __dirname + '/views/layaouts',
        partialsDir: __dirname + '/views/partials'
    })
);

//RUTAS

app.get('/', (req, res)=>{
    res.status(200).render('NuevoProducto.hbs')
})


//Rutas para probar con postman o en el front usando frameworks
const {prodRouter} = require('./routes/productsRoutes')
const {msgRouter} = require('./routes/messagesRoutes')

app.use('/api/productos', prodRouter);
app.use('/api/mensajes', msgRouter);



io.on('connection', async (socket)=>{
    console.log(`Nuevo usuario conectado con id: ${socket.id}; hora: ${Date()}`)

    // MEtodos con clases
    // const productos = await getProductos()
    // const mensajesChat = getMensajes()

    // Metodos con db.-
    const productos = await prodModel.getAll();
    const mensajesChat = await chatModel.getAll();

    socket.emit('productos', productos)
    socket.emit('chat', mensajesChat)
    
    socket.on('nuevoProducto', async(data)=>{
        // await saveNewProd(data)
        await prodModel.insertProduct(data)
        const productos = await prodModel.getAll()
        io.sockets.emit('productos', productos)
        console.log('nuevo producto desde el frontend')
    })
    //Chat.-
    socket.on('nuevoMensajeChat', async(data) =>{
        await chatModel.insertMessage(data);
        let nuevosMsg = await chatModel.getAll();
        io.sockets.emit('chat', nuevosMsg)
    })
})




const serverON = httpServer.listen(8080, ()=>{
    console.log('Server on port 8080')
})
serverON.on('error', error=> console.log(`Error del servidor ${error}`))