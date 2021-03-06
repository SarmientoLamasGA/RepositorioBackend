const fs = require("fs");
let instance = null;

//class
class Container {
  constructor() {
    this.url = `./productos.json`;
  }

  static getInstance() {
    if (!instance) {
      instance = new ContainerMongo();
    }
    return instance;
  }

  async searchFile() {
    if (fs.existsSync(this.url)) {
      const file = await fs.promises.readFile(this.url, "utf-8"); //Se busca archivo
      return JSON.parse(file);
    } else {
      //Si no existe el archivo, se procede a crar uno nuevo
      await fs.promises.writeFile(this.url, "[]"); //Se crea archivo
      await fs.promises.readFile(this.url, "utf-8"); //Se lee el archivo creado
      return { info: "No se encontró .txt, se creó uno nuevo" };
    }
  }

  async getAll() {
    const file = await this.searchFile();
    return file;
  }

  async getByID(index) {
    try {
      const data = await this.getAll();
      const exist = data.find((x) => x.id === Number(index));
      if (exist) {
        const found = data.find((x) => x.id === Number(index)); //Se busca el ID
        return found;
      } else {
        return { info: "El objeto no existe o fue borrado" };
      }
    } catch (er) {
      return { info: "Error" };
    }
  }

  async getRandom() {
    const data = await this.getAll();
    const randomProd = prods[Math.floor(Math.random() * prods.length)]; //se elige un elemento aleatorio del array
    return randomProd;
  }

  async save(prod) {
    try {
      const data = await this.getAll();
      const lastId = Math.max(...data.map((x) => x.id)); //Se busca el ID mas alto
      if (lastId != -Infinity) {
        const max = 1000000;
        const min = 1;
        data.push({
          title: String(prod.title),
          price: Number(prod.price),
          stock: Number(prod.stock),
          thumbnail: String(prod.thumbnail),
          description: String(prod.description),
          timeStamp: Number(Date.now()),
          code: Number(Math.floor(Math.random() * (max - min) + min)),
          id: Number(lastId + 1), //Se genera un ID en base al ID superior ya existente
        }); //Push
        fs.writeFile(this.url, JSON.stringify(data, null, 2), (er) => {
          if (er) {
            return { info: "Error, el producto no se pudo guardar" };
          } else {
            return { info: "Producto guardado" };
          }
        });
      } else {
        data.push({
          title: String(title),
          price: Number(price),
          stock: Number(prod.stock),
          thumbnail: String(thumbnail),
          description: String(prod.description),
          timeStamp: Number(Date.now()),
          code: Number(Math.floor(Math.random() * (max - min) + min)),
          id: Number(1), //se genera el primer ID
        }); //Push
        fs.writeFile(this.url, JSON.stringify(data, null, 2), (er) => {
          if (er) {
            return { info: "Error, el producto no se pudo guardar" };
          } else {
            return { info: "Producto guardado" };
          }
        });
      }
    } catch (er) {
      return { info: "Error, el producto no se pudo guardar" };
    }
  }

  async update(id, newTitle, newPrice, newThumbnail) {
    try {
      const data = await this.getAll();
      const exist = data.find((x) => x.id === Number(id)); //Se busca si existe el ID
      if (exist) {
        const item = data.findIndex((x) => x.id === id);
        if (item != undefined) {
          data[item].title = newTitle;
          data[item].price = newPrice;
          data[item].thumbnail = newThumbnail;
          fs.writeFile(this.url, JSON.stringify(data, null, 2), (er) => {
            if (er) {
              return { info: "no se pudo modificar el archivo" };
            } else {
              return { info: "Producto modificado" };
            }
          });
        } else {
          return { error: "Fuera de rango" };
        }
      }
    } catch (er) {
      return { info: "No se pudo realizar ninguna modificación" };
    }
  }

  async deleteById(index) {
    const data = await this.getAll();
    try {
      const exist = data.find((x) => x.id === Number(index)); // Se busca el si existe el ID
      if (exist) {
        const newArray = data.filter((x) => x.id != Number(index));
        fs.writeFile(this.url, JSON.stringify(newArray, null, 2), (er) => {
          if (er) {
            return { info: "No se pudo borrar el objeto" };
          } else {
            return { info: "Producto borrado" };
          }
        });
      } else {
        return { info: "Fuera de rango" };
      }
    } catch (er) {
      return { info: "Error" };
    }
  }
}

module.exports = Container;
