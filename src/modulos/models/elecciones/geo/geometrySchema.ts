import * as mongoose from 'mongoose';

const geometrySchema = new mongoose.Schema({
   type: {
      type: String,
      default: 'Point',
   },
   coordinates: {
      type: [Number],
      index: '2dsphere',
   },
});

export = geometrySchema;
