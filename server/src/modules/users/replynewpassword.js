const { hashSync, hash } = require("bcryptjs");
const sendEmail = require("../../nodemeiler");
const User = require("./User");
const { BadRequestError } = require("../../shared/errors");
const Confirmation = require("./Confirmation");

exports.replynewpassword = async (email, password) => {
  try {
    const existing = await User.findOne({ email: email });

    if (!existing) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }
    await sendEmail(email, password);
    // existing.emailpassword = password;
    await Confirmation.create({
      userId: existing.id,
      code: password,
    });
    await existing.save();
    return existing.email;
  } catch (error) {
    throw new BadRequestError("xatolik" + error);
  }
};
exports.newpassword = async (email, password, emailpassword) => {
  try {
    const existing = await User.findOne({ email });
    if (!existing) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }
    const code=await Confirmation.findOne({userId:existing.id})
    if (code.code !== emailpassword) {
      throw new BadRequestError("kodni xato kiritding");
    }

    const hashedPassword = await hash(password, 10);
    const time = Date.now() - new Date(code.updated_at);
    if (Number(time) / 1000 / 60 > 3) {
      // TODO auto delete verification
      // https://stackoverflow.com/questions/66885448/how-to-automatically-delete-document-in-mongodb-using-mongoose-on-some-date
    await Confirmation.deleteMany({userId:existing._id})
      throw new BadRequestError(" vaqt otib boldi");
    }
    existing.password = hashedPassword;
    await Confirmation.deleteMany({userId:existing._id})
    existing.save();
    return existing;
  } catch (error) {
    throw new BadRequestError("xatolik " + error);
  }
};
