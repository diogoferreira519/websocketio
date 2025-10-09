import {emitirTextoEditor, selecionarDocumento} from "./socket-front-documento.js";

const textArea = document.getElementById('editor-texto');

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
const tituloPagina = document.getElementById("titulo-documento")

tituloPagina.textContent = nomeDocumento || 'Documento sem titulo';

if (nomeDocumento) {
    selecionarDocumento(nomeDocumento);
}

textArea.addEventListener('keyup', (e)=> {
    e.preventDefault();
    emitirTextoEditor(e.target.value);
});

function atualizaClientesTextoEditor(texto) {
    textArea.value = texto;
}

export {atualizaClientesTextoEditor};

