const ChatDaoMongo = require("../daos/chat/chatDaoMongo");

class ChatFactory {
  create() {
    const db = ChatDaoMongo.getInstance();
    return db;
  }
}

module.exports = ChatFactory;
