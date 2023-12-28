const { hash } = require("bcryptjs");
const User = require("./User");
const { BadRequestError, NotFoundError } = require("../../shared/errors");
const Confirmation = require("./Confirmation");

const verified = async (data) => {
  const user = await User.findOne({ email: data.email ,isverified:false});
  console.log(user);
  if (!user) {
    throw new NotFoundError("bunday foydalanuvchi yo'q");
  }
  const code=await Confirmation.findOne({userId:user.id})
  if (code.code == data.password) {
    const time = Date.now() - new Date(code.updated_at);
    if (Number(time) / 1000 / 60 > 3) {
      await Confirmation.deleteMany({userId:user._id})
      throw new BadRequestError(" vaqt otib boldi");

    }
    user.isverified = true;
    await user.save();
    await Confirmation.deleteMany({userId:user._id})
    return user;
  } else {
    throw new BadRequestError("parol notugri kiritildi");
  }
};

module.exports = verified;
