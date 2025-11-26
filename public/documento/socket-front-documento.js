import { getCookie } from "../utils/cookies.js";
import { atualizaClientesTextoEditor, atualizaExcluir, atualizaListaUsers, tratarAutorizacaoUsuario } from "./documento.js";

const socket = io("/usuarios", {
    auth: {
        token: getCookie("tokenJwt")
    }
});

socket.on('autorizacao_sucesso', tratarAutorizacaoUsuario)

socket.on("usuarios_no_documento", atualizaListaUsers)

socket.on('conexao_existente', ()=> {
    alert('Documento já está aberto');
    window.location.href = '/';
})

socket.on('connect_error', (erro)=> {
    alert(erro);
    window.location.href = '/login/index.html';
});


function selecionarDocumento(dados) {
    socket.emit("selecionar_documento", dados)
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

socket.on("texto_editor_clientes", (dados)=> {
    atualizaClientesTextoEditor(dados);
});

socket.on("exclui_atualiza_pagina", (nomeDoc) => {
    atualizaExcluir(nomeDoc);
})



export {emitirTextoEditor, selecionarDocumento, salvaTexto, excluiDocumento};