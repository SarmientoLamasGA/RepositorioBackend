const fs = require("fs");

class messageDataBase {
  constructor() {
    this.url = "./messageDataBase.json";
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

  async saveChat(data) {
    try {
      const file = await this.searchFile();
      file.push(data);
      console.log(file);
      fs.writeFile(this.url, JSON.stringify(file, null, 2), (er) => {
        if (er) {
          return { info: "Error, el chat no se pudo guardar" };
        } else {
          return { info: "Chat guardado" };
        }
      });
    } catch (er) {
      return { info: "Hubo un error" };
    }
  }
}

module.exports = messageDataBase;
