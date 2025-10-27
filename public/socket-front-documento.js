import { atualizaClientesTextoEditor, atualizaExcluir } from "./documento/documento.js";

const socket = io();

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome)
}

function salvaTexto(dados) {
    socket.emit("salva_texto", dados)
}

function excluiDocumento(nomeDoc) {
    socket.emit("excluir_doc", nomeDoc);
}

function emitirTextoEditor(object) {
   socket.emit("texto_editor", object)
}

socket.on("texto_editor_clientes", (texto)=> {
    atualizaClientesTextoEditor(texto);
});

socket.on("exclui_atualiza_pagina", (nomeDoc) => {
    atualizaExcluir(nomeDoc);
})



export {emitirTextoEditor, selecionarDocumento, salvaTexto, excluiDocumento};