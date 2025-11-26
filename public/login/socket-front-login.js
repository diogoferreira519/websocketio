import { setCookie } from "../utils/cookies.js";

const socket = io();

export function emitirLoginUsuario(dados) {
    socket.emit('login_usuario', dados);
}

socket.on('login_usuario_sucesso', (tokenJwt)=> {
    setCookie('tokenJwt', tokenJwt);
    alert('login realizado com sucesso');
    window.location.href = "/";
})

socket.on('login_usuario_erro', ()=>{
    alert('Erro! usuario/senha incorretos');
})

socket.on('usuario_nao_encontrado', ()=>{
    alert('usuario não encontrado');
})