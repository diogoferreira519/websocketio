const socket = io();

export function emitirCadastrarUsuario(dados) {
    socket.emit('cadastro_usuario', dados);
}

socket.on('cadastro_usuario_sucesso', ()=> {
    alert('Cadastro realizado com sucesso');
})

socket.on('cadastro_usuario_erro', ()=>{
    alert('Erro ao realizar cadastro usuário');
})

socket.on('cadastro_usuario_existe', ()=> {
    alert('Usuário já existe');
})