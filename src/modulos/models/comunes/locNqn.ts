import { Schema, model } from 'mongoose';

const schema = new Schema({
    nombre: String,
});

export let locaNqn = model('locaNqn', schema, 'locaNqn');
