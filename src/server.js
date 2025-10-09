import express from 'express';
import url from "url";
import path from "path";
import http from "http";
import { Server } from 'socket.io';

const app = express();

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorio = path.join(caminhoAtual, '../../', "public");
app.use(express.static(diretorio));

const servidorHttp = http.createServer(app)

servidorHttp.listen(4343, () => console.log('ACERRTOOO'));

const io = new Server(servidorHttp);

export default io;
