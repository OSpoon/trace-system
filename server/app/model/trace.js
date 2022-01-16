// {
//     "id": "650000201310061821",
//     "trace_id": "TID_100153_100130_100010",
//     "order_id": "OID_200768_200901_200904",
//     "channel": "渠道2",
//     "login_user": "name",
//     "platform": "开放平台",
//     "module": "大额转出",
//     "content": "Rsddy psjdustp gpbpnwqy oiixxuwsr vjlpp ikovofivj vyhe inddbdvhjf cctbc gerkgwlcbk vybxhk mhlpwmzuiy qswyso ssyssrmql vyykq cbbh fbyxsqf ubt.",
//     "creation_time": "2010-01-22 20:43:40"
// },

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TraceSchema = new Schema(
    {
      trace_id: { type: String, required: true },
      order_id: { type: String, required: true },
      channel: { type: String, required: true },
      login_user: { type: String, required: true },
      platform: { type: String, required: true },
      module: { type: String, required: true },
      content: { type: String, required: true },
      creation_time: { type: String, required: true },
      username: { type: String, required: true },
      events: { type: Array, required: true },
    },
    { timestamps: true }
  );
  return mongoose.model('Trace', TraceSchema);
};
