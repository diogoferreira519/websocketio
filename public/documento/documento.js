import { emitirTextoEditor, selecionarDocumento, salvaTexto, excluiDocumento } from "./socket-front-documento.js"

const textArea = document.getElementById('editor-texto');

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = decodeURIComponent(parametros.get("nome")).trim();
const tituloPagina = document.getElementById("titulo-documento")
const buttonBack = document.getElementById('button-back');
const buttonExcluir = document.getElementById('excluir-documento')
const listaUsers = document.getElementById('lista-usuarios');

tituloPagina.textContent = nomeDocumento || 'Documento sem titulo';



function tratarAutorizacaoUsuario(payloadToken) {
    if (nomeDocumento) {
        selecionarDocumento({ nomeDocumento, user: payloadToken.user });
    }
}

textArea.addEventListener('keyup', (e) => {
    e.preventDefault();
    emitirTextoEditor({
        texto: e.target.value,
        nomeDocumento,
    });
});

buttonBack.addEventListener('click', () => {
    salvaTexto({ nomeDocumento, texto: textArea.value });
})

buttonExcluir.addEventListener('click', () => {
    excluiDocumento(nomeDocumento);
})



function atualizaClientesTextoEditor({ texto, user }) {
    textArea.value = texto;
}

function atualizaExcluir(nomeDoc) {
    if (nomeDoc == nomeDocumento) {
        alert(`Este documento ${nomeDoc} foi excluido por alguém`);
        window.location.href = "/"
    }
}

function atualizaListaUsers(users) {
    if (users && users.length > 0) {
        listaUsers.innerHTML = "";
        users.forEach((user) => {
            const li = document.createElement('li')
            li.textContent = `${user} 🟢`;
            li.className = 'list-group-item'
            listaUsers.appendChild(li);
        })
    }

}

export { atualizaClientesTextoEditor, atualizaExcluir, tratarAutorizacaoUsuario, atualizaListaUsers };

