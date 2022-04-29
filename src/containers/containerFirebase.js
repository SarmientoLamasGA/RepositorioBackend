var admin = require("firebase-admin");

var serviceAccount = require("../configFirebase");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class ContainerFirebase {
  constructor() {
    this.db = admin.firestore;
    this.query = db.collection(collection);
  }

  async getAll() {
    try {
      const coll = await db.collection.get();
      return coll;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      const doc = await this.query.doc(id);
      if (!doc.exist) {
        console.log("No existe");
      } else {
        console.log(doc);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      await this.query.add(obj);
      console.log("agregado");
    } catch (err) {
      console.log(err);
    }
  }

  // async deleteAll(){
  //   try{
  //     await this.query
  //   }
  // }

  async deleteById(id) {
    try {
      await this.query.doc(id).delete();
      console.log("borrado uno");
    } catch (err) {
      console.log(err);
    }
  }
}

exports.module = ContainerFirebase;
