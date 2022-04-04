const fs = require("fs");
const { stringify } = require("querystring");

class CartContainer {
  constructor() {
    this.url = "./cart.json";
  }

  async searchFile() {
    if (!fs.existsSync(this.url)) {
      await fs.promises.writeFile(this.url, "[]");
    }
    const file = await fs.promises.readFile(this.url, "utf-8");
    return JSON.parse(file);
  }

  async createCart() {
    const file = await this.searchFile();
    if (file.length === 0) {
      file.push({
        id: 1,
        timestamp: Date.now(),
        productos: [],
      });
    } else {
      const lastId = Math.max(...file.map((x) => x.id));
      file.push({
        id: lastId + 1,
        timestamp: Date.now(),
        productos: [],
      });
    }
    await fs.promises.writeFile(
      this.url,
      JSON.stringify(file, null, 2),
      (err) => {
        if (err) {
          return { Info: "Hubo un error, no se pudo crear el carro" };
        }
      }
    );
    return { Info: "Se ha creado un carrito nuevo" };
  }

  async deleteCart(id) {
    const file = await this.searchFile();
    if (file.find((x) => x.id === Number(id))) {
      const newFile = file.filter((x) => x.id != Number(id));
      await fs.promises.writeFile(
        this.url,
        JSON.stringify(newFile, null, 2),
        (err) => {
          if (err) {
            return { Info: "Hubo un error, no se pudo borrar el carro" };
          }
        }
      );
      return { Info: "Se ha borrado este carrito" };
    } else {
      return { Info: "No existe este producto" };
    }
  }

  async searchCart(id) {
    const file = await this.searchFile();
    const cart = file.find((x) => x.id === Number(id));
    return cart;
  }

  async getCart(id) {
    const cart = await this.searchCart(id);
    return cart;
  }

  async addProduct(id, product) {
    const file = await this.searchFile();
    const cart = await this.getCart(id);

    if (cart) {
      cart.productos.push(product);
      file.splice(id - 1, 1, cart);

      await fs.promises.writeFile(
        this.url,
        JSON.stringify(file, null, 2),
        (err) => {
          if (err) {
            return { Error: "Hubo un error y no se pudo guardar el producto" };
          }
        }
      );
      return file;
    } else {
      return { Info: "No existe este carrito" };
    }
  }

  async deleteProduct(idCart, idProduct) {
    const file = await this.searchFile();
    const cart = await this.searchCart(idCart);
    if (cart) {
      const prodIndex = cart.productos.findIndex((x) => x.id === idProduct);
      if (prodIndex >= 0) {
        cart.productos.splice(prodIndex, 1);
        file.splice(idCart - 1, 1, cart);
        await fs.promises.writeFile(
          this.url,
          JSON.stringify(file, null, 2),
          (err) => {
            if (err) {
              return { Error: "Hubo un error y no se pudo borrar el producto" };
            }
          }
        );
        return file;
      } else {
        return { Info: "El carrito no posee este producto" };
      }
    } else {
      return { Info: "Este carrito no existe" };
    }
  }
}

module.exports = CartContainer;
