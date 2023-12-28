const Chat = require("./Chat");
const addChat = require("./add-chat");

const getchat = async (user1,user2) => {
    const existing =await Chat.findOne({user1:user1,user2:user2})||await Chat.findOne({user1:user2,user2:user1})
    if(!existing){
        const result=await addChat(user1,user2)
        return result
    }
    return existing

};

module.exports = getchat;
