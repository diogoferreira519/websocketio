import { atualizaClientesTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome)
}

function salvaTexto(dados) {
    socket.emit("salva_texto", dados)
}

function emitirTextoEditor(object) {
   socket.emit("texto_editor", object)
}

socket.on("texto_editor_clientes", (texto)=> {
    atualizaClientesTextoEditor(texto);
});



export {emitirTextoEditor, selecionarDocumento, salvaTexto};