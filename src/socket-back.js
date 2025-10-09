import io from './server.js';
io.on("connection", (socket)=> {
    console.log('um cliente se conectou! ' + socket.id );
    
    socket.on('disconnect', ()=> {
        console.log('desconectou')
    })
    
    socket.on("selecionar_documento", (nome) => {
        socket.join(nome)
    })
  
    socket.on("texto_editor", (value)=> {
       // socket.broadcast.emit("texto_editor_clientes", value)
       socket.to("JavaScript").emit("texto_editor_clientes", value);
    })
})