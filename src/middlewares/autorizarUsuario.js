import jwt from 'jsonwebtoken';

export function autorizarUsuario (socket, next) {
    const tokenJwt = socket.handshake.auth.token;
    try {
        const payloadToken = jwt.verify(tokenJwt, process.env.SECRET);
        socket.emit('autorizacao_sucesso', payloadToken);

        next();
        
    }catch(error) {
        next(error);
    }
}