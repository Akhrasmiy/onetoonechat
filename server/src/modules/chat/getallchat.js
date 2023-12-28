const Chat = require("./Chat");

const getallChat = async (user) => {
  const result= await Chat.find({$or:[{user1:user},{user2:user}]})
  return result
};

module.exports = getallChat;
