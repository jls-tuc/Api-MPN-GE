const soap = require('soap');

const url = process.env.RNPURL;
const serv = process.env.RNPSERV;
const login = { usuario: 'sistema_ciudadania_sgc', password: 'Lame**852' };

export function getServicioRenaper(persona, userInfo?) {
  let resultado: any;
  return new Promise((resolve, reject) => {
    if (persona) {
      soap.createClient(url, (err, client) => {
        if (err) {
          return reject(err);
        }
        if (client) {
          if (persona.documento && persona.sexo) {
            client.LoginPecas(login, async (err2, result) => {
              if (err2) {
                reject(err2);
              }
              const tipoConsulta = 'WS_RENAPER_documento';
              const filtro = 'documento=' + persona.documento + ';sexo=' + persona.sexo;
              try {
                resultado = await consultaRenaper(result, tipoConsulta, filtro, userInfo);
                console.log('Resultadooo: ', resultado);
              } catch (error) {
                reject(error);
              }
              resolve(resultado);
            });
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    } else {
      resolve({
        persona,
        matcheos: { entidad: 'Renaper', matcheo: 0, datosPersona: {} },
      });
    }
  });
}

function consultaRenaper(sesion, tipo, filtro, userInfo?) {
  let rst: any;
  return new Promise((resolve, reject) => {
    if (sesion.return) {
      soap.createClient(url, (_err, client) => {
        const args = {
          IdSesion: sesion.return['$value'],
          Base: 'PecasAutorizacion',
        };
        client.FijarBaseDeSesion(args, async (err2, _result) => {
          if (err2) {
            reject(err2);
          }
          try {
            rst = await solicitarServicio(sesion, tipo, filtro, userInfo);
          } catch (error) {
            reject(error);
          }
          resolve(rst);
        });
      });
    } else {
      // Para el caso que falle la creación de la sesión con Pecas por servicio no disponible
      reject(null);
    }
  });
}

function solicitarServicio(sesion, tipo, filtro, userInfo?) {
  return new Promise((resolve, reject) => {
    soap.createClient(serv, (err3, client2) => {
      if (err3) {
        reject(err3);
      }
      const args2 = {
        IdSesionPecas: sesion.return['$value'],
        Cliente: 'CIUDADANIA',
        Proveedor: 'GP-RENAPER',
        Servicio: 'WS_RENAPER_documento',
        DatoAuditado: filtro,
        Operador: '25334392',
        Cuerpo: 'hola',
        Firma: false,
        CuerpoFirmado: false,
        CuerpoEncriptado: false,
      };

      if (client2) {
        client2.Solicitar_Servicio(args2, (err4, result2) => {
          if (err4) {
            reject(err4);
          }
          if (result2 && result2.return) {
            const codigoResultado = result2.return.CodResultado['$value'];
            if (result2.return.Resultado['$value']) {
              const resultado = new Buffer(result2.return.Resultado['$value'], 'base64');
              // convertimos a JSON el resultado
              const resArray = JSON.parse(resultado.toString('utf8'));
              resolve({ codigo: codigoResultado, datos: resArray });
            } else {
              resolve({ codigo: codigoResultado, datos: [] });
            }
          } else {
            reject('Error servicio RENAPER');
          }
        });
      } else {
        reject('Error en el cliente2 servicio ReNaPer');
      }
    });
  });
}
