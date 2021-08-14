import express, { Application } from 'express';
import https from 'https';
import fs from 'fs';

import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import passportM from './middlewares/passport-jwt';
require('dotenv').config();
// servidores
import local from './conexiones/dbMongo';
// rutas
import serverRoute from './modulos/routes/server';
import authUserRoute from './Auth/routes/authUsers.routes';
import personaRoute from './modulos/routes/personas/persona';
import provLocRoute from './modulos/routes/comunes/provLoc';
//modulo eleccion
import padronNqnRoute from './modulos/routes/elecciones/padronNqn.route';
import padronProvRoute from './modulos/routes/elecciones/padronProv.route';
import afiliadoNqnRoute from './modulos/routes/elecciones/afiliado.route';
import votoProvRoute from './modulos/routes/elecciones/votoProv.route';
import scriptRoute from './util/ScripTs/Scripts.route';
import graficaRoute from './modulos/routes/elecciones/grafica.route';

class ServerSPS {
   private app: Application;
   private port: string;
   private apiPath = '/api';

   constructor() {
      this.app = express();
      this.port = process.env.PORT || '8001';
      //incio los Middlewares
      this.middlewares();
      //cargar rutas
      this.routes();
   }

   async listen() {
      await local.local();
      //Servidor Express
      /*  https
         .createServer(
            {
               key: fs.readFileSync('c:/Certbot/live/paso2021nqn.com.ar/privKey.pem'),
               cert: fs.readFileSync('C:/Certbot/live/paso2021nqn.com.ar/cert.pem'),
            },
            this.app
         ) */
      this.app.listen(this.port, () => {
         console.info(`Servidor funcionando en: \x1b[32m${this.port}\x1b[0m`);
      });
   }

   middlewares() {
      //morgan para ver estados de los endpoint
      this.app.use(morgan('dev'));
      //cors
      this.app.use(cors());
      this.app.use(passport.initialize());
      this.app.use(passport.session());
      passport.use(passportM);

      //express
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.json({ limit: '100mb' }));

      this.app.all('*', (req, res, next) => {
         //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.header('Access-Control-Allow-Origin', '*');
         res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Requested-With,Accept ');
         res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');

         // Permitir que el método OPTIONS funcione sin autenticación
         if ('OPTIONS' === req.method) {
            res.header('Access-Control-Max-Age', '1728000');
            res.sendStatus(200);
         } else {
            next();
         }
      });
   }
   // lista de rutas

   routes() {
      this.app.use(this.apiPath, serverRoute);
      this.app.use(this.apiPath, authUserRoute);
      this.app.use(this.apiPath, personaRoute);
      this.app.use(this.apiPath, provLocRoute);
      //modulo Elecciones
      this.app.use(this.apiPath, padronNqnRoute);
      this.app.use(this.apiPath, padronProvRoute);
      this.app.use(this.apiPath, afiliadoNqnRoute);
      this.app.use(this.apiPath, votoProvRoute);
      this.app.use(this.apiPath, graficaRoute);

      //// scriptss
      this.app.use(this.apiPath, scriptRoute);
   }
}

export default ServerSPS;
