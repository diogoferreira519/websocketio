import jwt from 'jsonwebtoken';
export function gerarJwt(payload) {
    const tokenJwt = jwt.sign(payload, "supersecret", {
        expiresIn: "2 days",
    })
}