import encontrarDocumento from "../socket-back.js";

function registrarEventosDocumentos(socket, io, documentosCollection) {
     console.log('um cliente se conectou! ' + socket.id );
    
    socket.on('disconnect', ()=> {
        console.log('desconectou')
    })
    
    socket.on("selecionar_documento", async (nome) => {

        socket.join(nome)
        try {
            const documento = await encontrarDocumento(nome);

            if (documento) 
            {
                socket.emit("texto_editor_clientes", documento.texto);
            }
        } catch(error) {
            console.log(error.message);
        }
    })
  
    socket.on("texto_editor", ({texto, nomeDocumento})=> {
       //this code is used to not emit for all clients the event
        // socket.broadcast.emit("texto_editor_clientes", value)
       socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    })

    socket.on("salva_texto", async (dados) => {
        try {
            await documentosCollection.updateOne({nome: dados.nomeDocumento}, { $set: { texto: dados.texto || " "}});
            // if (atualizado.matchedCount === 0) {
            //     await documentosCollection.insertOne({nome: dados.nomeDocumento, texto: dados.texto})
            // } 
        } catch(error) {
            console.log(error.message);
        }
    })

    socket.on("excluir_doc", async (nomeDoc) => {
        try {
            await documentosCollection.deleteOne({nome: nomeDoc});
            io.emit("exclui_atualiza_pagina", nomeDoc);
        } catch(error) {
            console.log(error.message);
        }
    })
}

export default registrarEventosDocumentos;