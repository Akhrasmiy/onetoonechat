const mongoose = require("mongoose");
const User = require("../modules/users/User");
const Chat = require("../modules/chat/Chat");
const Confirmation = require("../modules/users/Confirmation");
const { hash, hashSync } = require("bcryptjs");

mongoose
  .connect("mongodb://127.0.0.1:27017/messanger", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB ga ulandi.");
  })
  .catch((err) => {
    console.log("DB da xatolik: ", err);
  });

const seedDB = async () => {
  await User.deleteMany({});
  await Chat.deleteMany({});
  await Confirmation.deleteMany({});
  await User.insertMany([
    {
      first_name: "abbos",
      last_name: "abbos",
      username: "abbos",
      password: hashSync("abbos", 10),
      email: "abbos@gmail.com",
      isverified: true,
    },
    {
      first_name: "bobur",
      last_name: "bobur",
      username: "bobur",
      password: hashSync("bobur", 10),
      email: "bobur@gmail.com",
      isverified: true,
    },{
      first_name: "zuxi",
      last_name: "zuxi",
      username: "zuxi",
      password: hashSync("zuxi", 10),
      email: "zuxi@gmail.com",
      isverified: true,
    },
    
  ]);
};
seedDB().then(() => {
  mongoose.disconnect();
});
