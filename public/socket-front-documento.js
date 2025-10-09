import { atualizaClientesTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome)
}

function emitirTextoEditor(texto) {
   socket.emit("texto_editor", texto)
}

socket.on("texto_editor_clientes", (texto)=> {
    atualizaClientesTextoEditor(texto);
});


export {emitirTextoEditor, selecionarDocumento};