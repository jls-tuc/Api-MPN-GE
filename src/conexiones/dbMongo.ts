import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const urlLocal = process.env.LOCALHST;
const urlArsat = process.env.ARSATDEV;
const CONEX_BD = process.env.CONEX_BD;
const Oficina = process.env.OFICINADEV;

const infoTec = async () => {
     try {
          await mongoose.connection.openUri(`${Oficina}`, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               useFindAndModify: false,
          });
          console.log('Mongo DB puerto 28018: \x1b[32m%s\x1b[0m', 'online');
     } catch (error) {
          console.log(error + 'Error al iniciar la base de datos:\x1b[41m%s\x1b[0m', 'OffLine');
     }
};

const dbArsat = async () => {
     try {
          await mongoose.connection.openUri(`${urlArsat}`, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               useFindAndModify: false,
          });
          console.log('Mongo DB puerto 28018: \x1b[32m%s\x1b[0m', 'online');
     } catch (error) {
          console.log(error + 'Error al iniciar la base de datos:\x1b[41m%s\x1b[0m', 'OffLine');
     }
};

const optic2 = async () => {
     try {
          await mongoose.connection.openUri(`${CONEX_BD}`, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               useFindAndModify: false,
          });
          console.log('Mongo DB puerto 27017: \x1b[32m%s\x1b[0m', 'online');
     } catch (error) {
          console.log(error + 'Error al iniciar la base de datos:\x1b[41m%s\x1b[0m', 'OffLine');
     }
};
const local = async () => {
     try {
          await mongoose.connection.openUri(`${urlLocal}`, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               useFindAndModify: false,
          });
          console.log('Mongo DB puerto 27017: \x1b[32m%s\x1b[0m', 'online');
     } catch (error) {
          console.log(error + 'Error al iniciar la base de datos:\x1b[41m%s\x1b[0m', 'OffLine');
     }
};

export = {
     dbArsat,
     optic2,
     local,
     infoTec,
};
