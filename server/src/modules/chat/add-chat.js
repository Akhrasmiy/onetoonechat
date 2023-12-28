const Chat = require("./Chat");

const addChat = async (user1,user2) => {
  const existing=await Chat.findOne({user1:user1,user2:user2})||await Chat.findOne({user1:user2,user2:user1})
  if(existing){
    return existing
  }
  else{
    const result=await Chat.create({user1:user1,user2:user2})
    return result
  }
};

module.exports = addChat;
