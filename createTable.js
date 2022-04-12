const { sqliteDB } = require("./options/sqlite");
const knex = require("knex")(sqliteDB);

// (async () => {
//   try {
//     await knex.schema.createTable("Mensajes", (table) => {
//       table.increments("id");
//       table.string("email");
//       table.string("message");
//       table.string("sent");
//     });
//     console.log("Tabla creada");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     knex.destroy();
//   }
// })();

(async () => {
  const data = await knex.schema.hasTable("Mensajes");
  console.log(data);
})();
