import { documentosCollection } from './dbConnect.js';
import io from './server.js';


io.on("connection", (socket)=> {
    console.log('um cliente se conectou! ' + socket.id );
    
    socket.on('disconnect', ()=> {
        console.log('desconectou')
    })
    
    socket.on("selecionar_documento", async (nome) => {

        socket.join(nome)

        const documento = await encontrarDocumento(nome);

        if (documento) 
        {
            socket.emit("texto_editor_clientes", documento.texto);
        }
    })
  
    socket.on("texto_editor", ({texto, nomeDocumento})=> {
       //this code is used to not emit for all clients the event
        // socket.broadcast.emit("texto_editor_clientes", value)
       socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    })

    socket.on("salva_texto", async (dados) => {
        const atualizado = await documentosCollection.updateOne({nome: dados.nomeDocumento}, { $set: { texto: dados.texto}});

        if (atualizado.matchedCount === 0) {
            await documentosCollection.insertOne({nome: dados.nomeDocumento, texto: dados.texto})
        } 
    })

    socket.on("consulta_docs", async (devolverDocumentos)=> {
        
        const documentos = await documentosCollection.find().toArray();
        
        if (documentos) {
            devolverDocumentos(documentos);
        }
    })
})

function encontrarDocumento(nome) {
    const documento = documentosCollection.findOne({nome});

    return documento;
}