import { documentosCollection } from './dbConnect.js';
import io from './server.js';


io.on("connection", (socket)=> {
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

    socket.on("insert_doc", async (nomeDoc) => {
        try {
            const existeDoc = await encontrarDocumento(nomeDoc);
            if (existeDoc) {
                io.emit("emite_alerta", `Nome do documento já existe ${nomeDoc}`);
                return;
            }

            const inseriu = await documentosCollection.insertOne({nome: nomeDoc, texto: ""});
            if (inseriu.insertedId) {
                io.emit('atualizar_pagina', nomeDoc);
            }
        } catch(error) {
            console.log(error.message);
        }
    })

    socket.on("consulta_docs", async (devolverDocumentos)=> {
        try {
            const documentos = await documentosCollection.find().toArray();
        
            if (documentos) {
                devolverDocumentos(documentos);
            }
        } catch(error) {
            console.error(error.message);
        }
    })
})

async function encontrarDocumento(nome) {
    try {
        const documento = await documentosCollection.findOne({nome});

        return documento;   
    } catch(error) {
        console.error(error.message);
    }
}