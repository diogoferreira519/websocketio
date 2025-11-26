import { autenticarUsuario } from "../utils/autenticarUsuario.js";
import { gerarJwt } from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io, usuarios) {
    socket.on('login_usuario', async ({nome, senha})=> {
        const usuarioBanco = await usuarios.findOne({nome});
        if (!usuarioBanco) {
            socket.emit('usuario_nao_encontrado')
            return;
        }

        const autenticado = autenticarUsuario(usuarioBanco, senha)

        if (!autenticado) {
            socket.emit('login_usuario_erro');
            return;
        }

        const tokenJwt = gerarJwt(nome);

        socket.emit('login_usuario_sucesso', tokenJwt);
    }) 
}
export default registrarEventosLogin;