const { faker } = require("@faker-js/faker");

class testContainer {
  async createProdList() {
    const list = [];
    for (let i = 0; i <= 5; i++) {
      const prod = {
        id: i + 1,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnai: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        createdAt: faker.date.past(),
        stock: faker.datatype.number({ min: 50, max: 10000 }),
      };
      list.push(prod);
    }
    return list;
  }
}

module.exports = testContainer;
