const ContainerMongo = require("../../containers/containerMongo");
const chatSchema = require("../models/chat.model");
let instance = null;

class ChatDaoMongo extends ContainerMongo {
  constructor() {
    super("chats", chatSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new ChatDaoMongo();
    }
    return instance;
  }
  async sendMessage(UId, message) {
    const chat = await this.getById(UId);
    chat.messages.push(message);

    await this.update(UId, chat);
  }
}

module.exports = ChatDaoMongo;
