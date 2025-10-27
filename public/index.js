import "./socket-front-index.js";
import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocs = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputDoc = document.getElementById('input-documento');

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