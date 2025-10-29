import encontrarDocumento from "../socket-back.js";

function registrarEventosInicio(socket, io, documentosCollection) {
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
}

export default registrarEventosInicio;