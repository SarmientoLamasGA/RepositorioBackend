const getDao = () => {
  const ChatFactory = require("../factory/chatFactory");
  const instance = new ChatFactory();
  const create = instance.create();
  return create;
};

class ChatService {
  constructor() {
    this.dao = getDao();
  }

  async getById(UId) {
    return await this.dao.getById(UId);
  }

  async sendMessage(UId, message) {
    return await this.dao.sendMessage(UId, message);
  }
}

module.exports = ChatService;
