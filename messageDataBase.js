const fs = require("fs");

class messageDataBase {
  constructor() {
    url = "./messageDataBase.json";
  }
  async searchFile() {
    try {
      const file = await fs.promises.readFile(this.url, "utf-8");
      return JSON.parse(file);
    } catch (er) {
      await fs.promises.writeFile(this.url, "[]");
      await fs.promises.readFile(this.url, "utf-8");
      return { info: "No se encontró .txt, se creó uno nuevo" };
    }
  }

  async getChat() {
    const file = await this.searchFile();
    return file;
  }

  async saveChat() {}
}

module.exports = messageDataBase;
