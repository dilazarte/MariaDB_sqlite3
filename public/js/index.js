const socket = io.connect();

//a la espera de lista de productos
socket.on('productos', data=>{
    listProds(data)
})

//funcion para listar productos.-
const listProds = (data) =>{
    const content = data.map((el, index) =>{
        return(
                `
                <tr>
                    <th scope="row">${el.id}</th>
                    <td>${el.nombre}</td>
                    <td>${el.descripcion}</td>
                    <td>${el.precio}</td>
                    <td><img src=${el.foto} alt=${el.nombre} width="30" height="30"></td>
                </tr>
                `
        )
    }).join('')
    document.getElementById('productosContainer').innerHTML = content;
}

//tomar producto del formulario y enviarlo al servidor
const newProd = (e) =>{
    nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value
    }
    socket.emit('nuevoProducto', nuevoProducto);
    return false
}


//espera de mensajes de chat
socket.on('chat', data=>{
    listMsg(data)
})


//listando mensajes de chat
const listMsg = (data) =>{
    const content = data.map((el, index) =>{
        return(
                `
                    <div>
                        <strong class="text-primary">${el.mail}</strong> <span class="text-danger">[${el.hora}]</span>: <em class="text-success">${el.texto}</em>
                    </div>
                `
        )
    }).join('')
    document.getElementById('chatContainer').innerHTML = content;
}

const sendMensaje = (e) =>{
    const nuevoMensaje = {
        mail: document.getElementById('mail').value,
        texto: document.getElementById('texto').value
    }
    socket.emit('nuevoMensajeChat', nuevoMensaje);
    return false
}



function isEmpty(){
    let mail = document.getElementById('mail').value;
    let mensaje = document.getElementById('texto').value;
    let botonEnviar = document.getElementById('btn-submit');

    if(mail != '' && mensaje != ''){
        botonEnviar.removeAttribute('disabled')
    }else{
        botonEnviar.setAttribute('disabled', 'disabled')
    }
}