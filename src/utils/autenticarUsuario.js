import { scryptSync, timingSafeEqual } from 'crypto';
export function autenticarUsuario(usuario, senhaDigitada) {
    console.log('usuario ' + usuario + ' senha: ' + JSON.stringify(senhaDigitada))
    const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64);
    const hashReal = Buffer.from(usuario.hashSenha, 'hex');
    const autenticado = timingSafeEqual(hashReal, hashTeste);

    return autenticado;
}