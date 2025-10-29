import { documentosCollection, usuariosCollection } from './dbConnect.js';
import registrarEventosCadastro from './registraEventos/cadastro.js';
import registrarEventosDocumentos from './registraEventos/documento.js';
import registrarEventosInicio from './registraEventos/inicio.js';
import registrarEventosLogin from './registraEventos/login.js';
import io from './server.js';


io.on("connection", (socket)=> {
    registrarEventosLogin(socket, io, usuariosCollection);
   registrarEventosInicio(socket, io, documentosCollection);
   registrarEventosCadastro(socket, io, usuariosCollection);
   registrarEventosDocumentos(socket, io, documentosCollection);
})

async function encontrarDocumento(nome) {
    try {
        const documento = await documentosCollection.findOne({nome});

        return documento;   
    } catch(error) {
        console.error(error.message);
    }
}

export default encontrarDocumento;