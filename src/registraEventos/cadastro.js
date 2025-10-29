import criaHashESalSenha from "../utils/criaHashESalSenha.js";

function registrarEventosCadastro(socket, io, usuarios) {
    socket.on('cadastro_usuario', async ({nome, senha})=> {
       if (nome && senha) {
        const existeUsuario = await usuarios.findOne({nome});

        if (!existeUsuario) {
            const { hashSenha, salSenha } = criaHashESalSenha(senha);

            const cadastra = await usuarios.insertOne({nome, hashSenha, salSenha});
            if (cadastra.acknowledged) {
                io.emit('cadastro_usuario_sucesso');
            } else {
                io.emit('cadastro_usuario_erro');
            }
        } else {
            io.emit('cadastro_usuario_existe');
        }
       }
    })
}
export default registrarEventosCadastro;