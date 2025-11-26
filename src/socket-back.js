import { documentosCollection, usuariosCollection } from './dbConnect.js';
import { autorizarUsuario } from './middlewares/autorizarUsuario.js';
import registrarEventosCadastro from './registraEventos/cadastro.js';
import registrarEventosDocumentos from './registraEventos/documento.js';
import registrarEventosInicio from './registraEventos/inicio.js';
import registrarEventosLogin from './registraEventos/login.js';
import io from './server.js';

const nspUsuarios = io.of('/usuarios');
nspUsuarios.use(autorizarUsuario);

nspUsuarios.on('connection', (socket) => {
    registrarEventosInicio(socket, nspUsuarios, documentosCollection);   
    registrarEventosDocumentos(socket, nspUsuarios, documentosCollection);
})

io.of('/').on("connection", (socket)=> {
    registrarEventosLogin(socket, io, usuariosCollection);
    registrarEventosCadastro(socket, io, usuariosCollection);
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