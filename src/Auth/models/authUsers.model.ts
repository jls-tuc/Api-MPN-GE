import { Schema, model, Document } from 'mongoose';
import { constantes } from '../../util/constantes';
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

export interface Iusuario extends Document {
     usuario: string;
     password: string;
     activo: boolean;
     fechaAltaUsuario: string;
     fechaBajaUsuario: string;
     lastLogin: string;
     role: string;
     idCoordinador: any;
     idReferente: any;
     seccional?: string;
     datosPersonales: {
          nombres: string;
          apellido: string;
          dni: string;
          sexo: string;
          calle: string;
          foto: string;
          numero: string;
          provincia: string;
          localidad: string;
          email: string;
          telefono: string;
          areaResponsable: string;
     };

     comparePassword: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema<Iusuario>(
     {
          usuario: {
               type: String,
               required: true,
               trim: true, //calls .trim() on the value to get rid of whitespace
               unique: true,
          },
          password: {
               type: String,
               required: true,
               trim: true,
               minlength: 6,
          },
          activo: {
               type: Boolean,
               required: true,
               default: true,
          },
          fechaAltaUsuario: { type: String },
          fechaBajaUsuario: { type: String },
          lastLogin: { type: String },
          role: { type: String, lowercase: true },
          idCoordinador: { type: String, lowercase: true },
          idReferente: { type: String },
          seccional: { type: String, lowercase: true },
          datosPersonales: {
               nombres: { type: String, lowercase: true },
               apellido: { type: String, lowercase: true },
               dni: { type: String },
               sexo: { type: String, lowercase: true },
               foto: { type: String },
               calle: { type: String, lowercase: true },
               numero: { type: String },
               provincia: { type: String, lowercase: true },
               localidad: { type: String, lowercase: true },
               email: { type: String },
               telefono: { type: String },
               areaResponsable: { type: String, lowercase: true },
          },
     },
     { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

userSchema.pre('save', function (next) {
     let user: any = this;

     if (!user.isModified('password')) {
          return next();
     }

     //we generate the salt using 12 rounds and then use that salt with the received password string to generate our hash
     bcrypt
          .genSalt(12)
          .then((salt) => {
               return bcrypt.hash(user.password, salt);
          })
          .then((hash) => {
               user.password = hash;
               next();
          })
          .catch((err) => next(err));
});

userSchema.methods.comparePassword = async function (password: string): Promise<Boolean> {
     return await bcrypt.compare(password, this.password);
};

export const usuarios = model<Iusuario>('authUsers', userSchema, 'authUsers');
