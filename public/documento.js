import {emitirTextoEditor, selecionarDocumento, salvaTexto} from "./socket-front-documento.js"

const textArea = document.getElementById('editor-texto');

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
const tituloPagina = document.getElementById("titulo-documento")
const buttonBack = document.getElementById('button-back');

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

function atualizaClientesTextoEditor(texto) {
    textArea.value = texto;
}

export {atualizaClientesTextoEditor};

