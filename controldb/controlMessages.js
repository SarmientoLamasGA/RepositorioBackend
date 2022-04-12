const { sqliteDB } = require("../options/sqlite");
const knex = require("knex")(sqliteDB);
const moment = require("moment");

class ControlMessage {
  async createTable() {
    try {
      await knex.schema.createTable("Mensajes", (table) => {
        //Crea una tabla
        table.increments("id");
        table.string("email");
        table.string("message");
        table.string("sent");
      });
      console.log("Tabla creada");
    } catch (err) {
      console.log(err);
    } finally {
      knex.destroy();
    }
  }

  async getChat() {
    //Obtiene mensajes
    const exist = await knex.schema.hasTable("Mensajes");
    if (!exist) {
      //Verifica si la tabla existe, si no la crea
      this.createTable();
    }
    const data = await knex.from("Mensajes").select("*");
    return data;
  }

  async saveChat(data) {
    try {
      //Guarda el mensaje
      await knex.from("Mensajes").insert({
        email: data.email,
        message: data.message,
        sent: moment().format("MMMM Do YYYY, h:mm:ss a"),
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ControlMessage;
