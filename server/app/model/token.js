'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TokenSchema = new Schema({
    token: { type: String, required: true },
  }, { timestamps: true });
  return mongoose.model('Token', TokenSchema);
};

/**
// 4. 查询
const user = this.ctx.model.User.findOne({ email });

// 5. 插入
const ret = await ctx.model.User.create({
  email,
  nickname,
  password: md5(password + HashSalt),
});
if (ret._id) {
  this.message('注册成功');
}
 */
