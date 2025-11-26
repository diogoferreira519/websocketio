import jwt from 'jsonwebtoken';
export function gerarJwt(payload) {
    const tokenJwt = jwt.sign({user: payload}, process.env.SECRET, {
        expiresIn: "1h",
    });

    return tokenJwt;
}