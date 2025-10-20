import { insertDocsInList } from "./index.js";

const socket = io();

socket.emit('consulta_docs', (documentos) => {
    
   if (documentos) {
        documentos.forEach((doc)=> {
            insertDocsInList(doc.nome) 
       })
   }
});