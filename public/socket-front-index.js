import { insertDocsInList } from "./index.js"
import { getCookie } from "./utils/cookies.js";

const socket = io('/usuarios', {
    auth: {
        token: getCookie('tokenJwt')
    }
})

socket.on('connect_error', (erro) => {
    alert(erro);
    window.location.href = '/login/index.html';
});

consultaDocs()

function consultaDocs() {
    socket.emit('consulta_docs', (documentos) => {

        if (documentos) {
            documentos.forEach((doc) => {
                insertDocsInList(doc.nome)
            })
        }
    })
}

socket.on("emite_alerta", (mensagemAlert) => {
    alert(mensagemAlert)
})

socket.on('atualizar_pagina', (nomeDoc) => {
    insertDocsInList(nomeDoc)
})

socket.on("exclui_atualiza_pagina", (nomeDoc) => {
    window.location.reload()
})

function emitirAdicionarDocumento(nomeDoc) {
    socket.emit('insert_doc', nomeDoc)
}

export { emitirAdicionarDocumento }