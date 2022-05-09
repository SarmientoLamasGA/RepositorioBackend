var admin = require("firebase-admin");

var serviceAccount = require("../configFirebase/coderbackend-193a9-firebase-adminsdk-noevz-f72857648a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class ContainerFirebase {
  constructor(collection) {
    this.db = admin.firestore();
    this.query = this.db.collection(collection);
  }

  async getAll() {
    try {
      const list = [];
      const snapshot = await this.query.get();
      snapshot.forEach((doc) => list.push({ id: doc.id, prod: doc.data() }));
      return list;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      const doc = await this.query.doc(id).get();
      if (doc.empty) {
        console.log("No existe");
      } else {
        return doc.data();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      if (obj) {
        await this.query.add(obj);
        return this.getAll();
      } else {
        const cart = { productos: [], createdAt: Date.now() };
        await this.query.add(cart);
        return await this.getAll();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      await this.query.doc(id).update(data);
      return this.getById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      const snapshot = await this.query.get();
      snapshot.forEach((doc) => this.query.doc(doc.id).delete());
      return await this.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      await this.query.doc(id).delete();
      return { Info: "Se ha borrado el producto" };
    } catch (err) {
      console.log(err);
    }
  }

  async addToCart(cart, prod, idCart, prodWithId) {
    try {
      if (cart && prod) {
        console.log("post");
        // cart.productos.push(prodWithId);
        // return await this.update(idCart, cart);
      } else {
        return { Info: "No existe el elemento" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFromCart(cart, idCart, idProd) {
    try {
      if (cart) {
        const prodIndex = cart.productos.findIndex(
          (p) => p.id.valueOf() === idProd
        );
        if (prodIndex !== -1) {
          cart.productos.splice(prodIndex, 1);
          await this.update(idCart, cart);
          res.send(await this.getById(idCart));
        }
      } else {
        return { Info: "No exsite el elemento" };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ContainerFirebase;
