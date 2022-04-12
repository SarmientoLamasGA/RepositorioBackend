const sqliteDB = {
  client: "sqlite3",
  connection: {
    filename: "./db/ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = { sqliteDB };
