import http from "http";
import app from "./app";

//configurando a porta 6001
const port = 6002;

//Criando o server com o express
const server = http.createServer(app);
server.listen(port);
