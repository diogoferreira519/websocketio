import {emitirTextoEditor, selecionarDocumento, salvaTexto, excluiDocumento} from "./socket-front-documento.js"

const textArea = document.getElementById('editor-texto');

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = decodeURIComponent(parametros.get("nome")).trim();
const tituloPagina = document.getElementById("titulo-documento")
const buttonBack = document.getElementById('button-back');
const buttonExcluir = document.getElementById('excluir-documento')

tituloPagina.textContent = nomeDocumento || 'Documento sem titulo';

if (nomeDocumento) {
    selecionarDocumento(nomeDocumento);
}

textArea.addEventListener('keyup', (e)=> {
    e.preventDefault();
    emitirTextoEditor({
        texto: e.target.value, 
        nomeDocumento,
    });
});

buttonBack.addEventListener('click', ()=> {
    salvaTexto({nomeDocumento, texto: textArea.value});
})

buttonExcluir.addEventListener('click', ()=> {
    excluiDocumento(nomeDocumento);
})

function atualizaClientesTextoEditor(texto) {
    textArea.value = texto;
}

function atualizaExcluir(nomeDoc) {
    console.log('caiuiu?')
    if (nomeDoc == nomeDocumento) {
        console.log('caiuiu?')
        alert(`Este documento ${nomeDoc} foi excluido por alguém`);
        window.location.href = "/"
    }
}

export {atualizaClientesTextoEditor, atualizaExcluir};

