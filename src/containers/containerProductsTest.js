const { faker } = require("@faker-js/faker");
const fs = require("fs");

class testContainer {
  async createProdList() {
    let str = "Nombre;Apellido;Email;Trabajo;Direccion\r\n";
    for (let i = 0; i <= 5; i++) {
      str +=
        faker.commerce.product() +
        ";" +
        faker.commerce.price() +
        ";" +
        faker.image.imageUrl() +
        ";" +
        faker.commerce.productDescription() +
        ";" +
        faker.date.past() +
        ";" +
        faker.datatype.number({ min: 50, max: 10000 }) +
        "\r\n";
    }
    await fs.promises.writeFile("./test.scv", str, (err) => {
      if (err) console.log(err);
    });
    return await fs.promises.readFile("./test.scv", "utf-8");
  }
}

module.exports = testContainer;
