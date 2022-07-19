const { optionsmysql } = require("../options/mariaDB");
const knex = require("knex")(optionsmysql);

class MariaDB {
  async createTable() {
    try {
      //Crea tabla
      await knex.schema.createTable("productos", (table) => {
        table.increments("id");
        table.string("title");
        table.float("price");
        table.string("thumbnail");
        table.string("description");
        table.timestamp("time");
        table.integer("stock");
      });
      console.log("Tabla creada con MariaDB");
    } catch (err) {
      console.log(err);
    } finally {
      knex.destroy();
    }
  }

  async getAll() {
    try {
      //Obtiene todos los productos
      const exist = await knex.schema.hasTable("Productos");
      if (!exist) {
        //verifica que exista la tabla, si no la crea
        this.createTable();
      }
      const data = await knex.select("*").from("Productos");
      return data;
    } catch (err) {
      await knex.schema.createTable("productos", (table) => {
        table.increments("id");
        table.string("title");
        table.float("price");
        table.string("thumbnail");
        table.string("description");
        table.timestamp("time");
        table.integer("stock");
      });
    }
    // NO hago el destroy porque sino me devuelve error, idem con los siguientes métodos
    // finally {
    //   knex.destroy();
    // }
  }

  async save(prod) {
    //Guarda producto
    try {
      const exist = await knex.schema.hasTable("Productos");
      if (!exist) {
        this.createTable();
      }
      await knex("Productos").insert({
        title: prod.title,
        price: prod.price,
        thumbnail: prod.thumbnail,
        description: prod.description,
        stock: 5000,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    //Obtiene producto por ID si se le proporciona
    try {
      return await knex("Productos").where({ id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async update(prodId, { title, price, thumbnail }) {
    //Actualiza el producto según el ID con los valores tomados del body
    try {
      const data = await knex("Productos").where({ id: prodId });
      if (data != 0) {
        await knex("Productos")
          .where({ id: prodId })
          .update({ title: title, price: price, thumbnail: thumbnail });
      } else {
        return { info: "No existe este producto o fue borrado" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    //Borra producto según ID
    try {
      const data = await knex("Productos").where({ id: id });
      if (data != 0) {
        await knex("Productos").where({ id: id }).del();
      } else {
        return { info: "No existe este producto" };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = MariaDB;
