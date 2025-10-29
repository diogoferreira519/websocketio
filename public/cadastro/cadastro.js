import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";
const formCadastro = document.getElementById('form-cadastro');
formCadastro.addEventListener('submit', (e)=> {
    e.preventDefault();
   
    const nome = formCadastro['input-usuario'].value;
    const senha = formCadastro['input-senha'].value;

    emitirCadastrarUsuario({nome, senha});
})