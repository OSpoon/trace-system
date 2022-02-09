'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema(
    {
      username: { type: String, required: true },
      password: { type: String, required: true },
      roles: { type: Array, required: true },
      introduction: { type: String, required: true },
      avatar: { type: String, default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' },
      name: { type: String, required: true },
      email: { type: String, required: true },
      disable: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  return mongoose.model('User', UserSchema);
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
