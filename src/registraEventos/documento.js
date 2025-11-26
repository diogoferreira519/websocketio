import encontrarDocumento from "../socket-back.js";
import { adicionarConexao, encontrarConexao, getUsuarioByDocument, removerConexao } from "../utils/conexoesDocumentos.js";

function registrarEventosDocumentos(socket, io, documentosCollection) {

    socket.on("selecionar_documento", async ({ nomeDocumento, user }) => {
        try {
            const documento = await encontrarDocumento(nomeDocumento);

            if (documento) {
                const existeConexao = encontrarConexao(nomeDocumento, user);

                if (existeConexao) {
                    socket.emit('conexao_existente');
                    return;
                }

                socket.join(nomeDocumento);

                socket.nomeDocumento = nomeDocumento;
                socket.user = user;

                adicionarConexao({ nomeDocumento, user });
                emiteUsuarioPorDocumento(nomeDocumento, io);

                socket.emit("texto_editor_clientes", { texto: nomeDocumento, user });
            }
        } catch (error) {
            console.log(error.message);
        }
    });

    socket.on('disconnect', () => {
        if (socket.nomeDocumento && socket.user) {
            removerConexao(socket.nomeDocumento, socket.user);
            emiteUsuarioPorDocumento(socket.nomeDocumento, io);
        }
    });

    socket.on("texto_editor", ({ texto, nomeDocumento, user }) => {
        socket.to(nomeDocumento).emit("texto_editor_clientes", { texto, user });
    });

    socket.on("excluir_doc", async (nomeDoc) => {
        try {
            await documentosCollection.deleteOne({ nome: nomeDoc });
            io.emit("exclui_atualiza_pagina", nomeDoc);
        } catch (error) {
            console.log(error.message);
        }
    });

    socket.on("salva_texto", async (dados) => {
        try {
            await documentosCollection.updateOne(
                { nome: dados.nomeDocumento },
                { $set: { texto: dados.texto || " " } }
            );
        } catch (error) {
            console.log(error.message);
        }
    });
}

function emiteUsuarioPorDocumento(nomeDocumento, io) {
    const usuariosNoDocumento = getUsuarioByDocument(nomeDocumento);
    io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
}

export default registrarEventosDocumentos;
