import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();
const url = process.env.URL_CONNECTION;

const client = new MongoClient(url);

let documentosCollection;
let usuariosCollection;

try {
  const database = await client.db('sample_mflix');
  documentosCollection = database.collection('documentos');
  usuariosCollection = database.collection('usuarios');

  console.log('conectado ao banco de dados');
}catch(error) {
  console.log(error);
} 

export { documentosCollection, usuariosCollection };