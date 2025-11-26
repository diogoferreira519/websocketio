import "./socket-front-index.js";
import { emitirAdicionarDocumento } from "./socket-front-index.js";
import { getCookie, removeCookie } from "./utils/cookies.js";

const tokenJwt = getCookie('tokenJwt');

const listaDocs = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDoc = document.getElementById('input-documento');
const logout = document.getElementById('botao-logout');

logout.addEventListener('click', ()=> {
    removeCookie('tokenJwt');
    alert('Usuário deslogado com sucesso')
    window.location.href='/login/index.html';

});

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    emitirAdicionarDocumento(inputDoc.value.trim());
    inputDoc.value = "";
});

function insertDocsInList(nome) {
     listaDocs.innerHTML +=
    `<a href="./documento/index.html?nome=${nome}" class="list-group-item list-group-item-action">
        ${nome}
    </a>
    `
}

export { insertDocsInList };