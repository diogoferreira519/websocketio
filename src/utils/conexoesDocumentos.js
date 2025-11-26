const conexoesDocumentos = [];

function adicionarConexao({ nomeDocumento, user }) {
    conexoesDocumentos.push({ nomeDocumento, user });
}

function getUsuarioByDocument(nomeDocumento) {
    return conexoesDocumentos
        .filter((conexaoDoc) => conexaoDoc.nomeDocumento === nomeDocumento)
        .map((conexaoDoc) => conexaoDoc.user);
}

function encontrarConexao(nomeDocumento, user) {
    const existeConexao =conexoesDocumentos.find((conexao)=> conexao.nomeDocumento === nomeDocumento && conexao.user === user);
    
    return existeConexao ? true : false
}

function removerConexao(nomeDocumento, user) {
    const index = conexoesDocumentos.findIndex((conexaoDoc)=> conexaoDoc.nomeDocumento === nomeDocumento && conexaoDoc.user === user);
    
    if (index !== -1) {
        conexoesDocumentos.splice(index, 1);
    }
}

function getUsuarios() {
    return conexoesDocumentos;
}

export { adicionarConexao, getUsuarioByDocument, getUsuarios, removerConexao, encontrarConexao}