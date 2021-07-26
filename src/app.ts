import dotenv from 'dotenv';
import ServerSPS from './index';
dotenv.config();

const server = new ServerSPS();

server.listen();
