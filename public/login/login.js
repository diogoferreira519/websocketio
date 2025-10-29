import { emitirLoginUsuario } from "./socket-front-login.js";

const formCadastro = document.getElementById('form-login');
formCadastro.addEventListener('submit', (e)=> {
    e.preventDefault();
   
    const nome = formCadastro['input-usuario'].value;
    const senha = formCadastro['input-senha'].value;

    emitirLoginUsuario({nome, senha});
})