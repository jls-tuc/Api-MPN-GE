export const constantes = {
  SEXO: {
    type: String,
    required: true,
    es_indexed: true,
    enum: ['F', 'M', 'O'],
  },
  ESTADOCIVIL: {
    type: String,
    enum: ['casado', 'separado', 'divorciado', 'viudo', 'soltero', 'otro'],
  },
  CONTACTO: {
    type: String,
    enum: ['', 'fijo', 'celular', 'email'],
  },
  PARENTESCO: {
    type: String,
    enum: ['progenitor/a', 'hijo', 'hermano', 'tutor'],
  },
  ESTADO: {
    type: String,
    required: true,
    es_indexed: true,
    enum: ['temporal', 'validado', 'recienNacido', 'extranjero'],
  },
  IDENTIFICACION: {
    type: String,
    required: false,
    enum: ['dni extranjero', 'pasaporte', null],
  },
  GENERO: {
    type: String,
    required: true,
    es_indexed: true,
    enum: ['femenino', 'masculino', 'otro'],
  },
};
