'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TrackSchema = new Schema(
    {
      uid: { type: String, required: true },
      data: [
        {
          timestamp: { type: String, required: true },
          events: { type: Array, required: true },
        },
      ],
      systemId: { type: String, required: false },
      businessId: { type: String, required: false },
    },
    { timestamps: true }
  );
  return mongoose.model('Track', TrackSchema);
};
